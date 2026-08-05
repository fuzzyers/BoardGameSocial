import { getGroupMessages } from "@/services/messages";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from "react-native";
import MessageInput from "./messageInput";
import { Group, Message } from "@/types/apiDataTypes";
import { getSocket } from "@/services/socket";
import GroupManagment from "./groupManagment";

type ChatBoxProps = {
    group: Group | null;
};

const ChatBox = ({group}: ChatBoxProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [groupName, setGroupName] = useState<string>(group?.name || "No Group Selected");
    const [groupData, setGroupData] = useState<any>(group || null);

    
    useEffect(() => {
        if (!group) return;

        const loadMessages = async () => {
            const response = await getGroupMessages(group.id);

            if (!response) return;
            setGroupName(group.name);
            setMessages(response.messages);
            setGroupData(response);
        };

        loadMessages();
    }, [group]);

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

        // Socket is already connected
        if (socket.connected) {
            joinRoom();
        } else {
            // Wait until it connects
            socket.on("connect", joinRoom);
        }

        return () => {
            socket.off("connect", joinRoom);
        };

    }, [group]);


    useEffect(() => {
        const socket = getSocket();

        if (!socket) {
            console.log("No socket");
            return;
        }

        socket.on("new_message", (message) => {

            setMessages(previous => [
                ...previous,
                message
            ]);
        });

        return () => {
            socket.off("new_message");
        };
    }, []);

    return (
        <View style={styles.chatContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{groupName}</Text>
                <Pressable style={styles.manageButton} onPress={() => setShowModal(true)}>
                    <Text style={styles.manageButtonText}>Manage Group</Text>
                </Pressable>
                <GroupManagment visible={showModal} onClose={() => setShowModal(false)} groupData={groupData}/>
            </View>

            <ScrollView
                style={styles.messages}
                contentContainerStyle={styles.messagesContent}
            >
                {messages.map((message) => (
                    <View key={message.id} style={styles.message}>
                        <Text style={styles.sender}>
                            {message.sender_name}
                        </Text>
                        <Text>{message.message}</Text>
                        <Text style={styles.timestamp}>
                            {new Date(message.created_at).toLocaleDateString("en-NZ", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            <MessageInput chatId={group?.chat_id}/>
        </View>
    );
};

export default ChatBox;

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 12,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,

        overflow: "hidden",
        width: "100%"
    },

    header: {
        backgroundColor: "#007AFF",
        paddingVertical: 18,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    headerText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
    },

    messages: {
        flex: 1,
    },

    messagesContent: {
        padding: 16,
    },

    message: {
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    sender: {
        fontWeight: "600",
        marginBottom: 4,
    },

    timestamp: {
        marginTop: 4,
        fontSize: 12,
        color: "#777",
    },
    manageButton: {
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },

    manageButtonText: {
        color: "#007AFF",
        fontWeight: "600",
        fontSize: 14,
    },
});