import { useEffect, useState } from "react";
import { Group, Message } from "@/types/apiDataTypes";
import { getGroupMessages } from "@/services/messages";
import { getSocket } from "@/services/socket";

export const useGroupChat = (group: Group | null) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [groupData, setGroupData] = useState<Group | null>(group);
    const [loading, setLoading] = useState(false);

    /*
     * Load the existing messages when the group changes
     */
    useEffect(() => {
        if (!group) {
            setMessages([]);
            setGroupData(null);
            return;
        }

        const loadMessages = async () => {
            try {
                setLoading(true);

                const response = await getGroupMessages(group.id);

                if (!response) return;

                setMessages(response.messages);
                setGroupData(response);
            } catch (error) {
                console.error("Failed to load messages:", error);
            } finally {
                setLoading(false);
            }
        };

        loadMessages();
    }, [group]);

    /*
     * Join the group's socket room
     */
    useEffect(() => {
        const socket = getSocket();

        if (!socket || !group) {
            return;
        }

        const roomId = `chat-${group.chat_id}`;

        const joinRoom = () => {
            socket.emit("joinRoom", roomId);
            console.log("Joined room:", roomId);
        };

        if (socket.connected) {
            joinRoom();
        } else {
            socket.on("connect", joinRoom);
        }

        return () => {
            socket.off("connect", joinRoom);
        };
    }, [group]);

    /*
     * Listen for new messages
     */
    useEffect(() => {
        const socket = getSocket();

        if (!socket) {
            return;
        }

        const handleNewMessage = (message: Message) => {
            setMessages((previous) => [...previous, message]);
        };

        socket.on("new_message", handleNewMessage);

        return () => {
            socket.off("new_message", handleNewMessage);
        };
    }, []);

    return {
        messages,
        groupData,
        loading,
    };
};
