import { getGroupMessages } from "@/services/messages";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
} from "react-native";

import MessageInput from "./messageInput";
import { Group, Message } from "@/types/apiDataTypes";
import { getSocket } from "@/services/socket";
import GroupManagment from "./groupManagment";

type ChatBoxProps = {
    group: Group | null;
    onBack: () => void;
};

const ChatBox = ({ group, onBack }: ChatBoxProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [groupName, setGroupName] = useState(
        group?.name || "No Group Selected"
    );
    const [groupData, setGroupData] = useState<Group | null>(group);

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

        if (socket.connected) {
            joinRoom();
        } else {
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

        const handleNewMessage = (message: Message) => {
            setMessages((previous) => [
                ...previous,
                message,
            ]);
        };

        socket.on("new_message", handleNewMessage);

        return () => {
            socket.off("new_message", handleNewMessage);
        };
    }, []);

    return (
        <View style={styles.chatContainer}>
            <View style={styles.header}>

                <Pressable
                    style={styles.backButton}
                    onPress={onBack}
                >
                    <Text style={styles.backButtonText}>
                        ←
                    </Text>
                </Pressable>

                <Text
                    style={styles.headerText}
                    numberOfLines={1}
                >
                    {groupName}
                </Text>

                <Pressable
                    style={styles.manageButton}
                    onPress={() => setShowModal(true)}
                >
                    <Text style={styles.manageButtonText}>
                        Manage
                    </Text>
                </Pressable>

                <GroupManagment
                    visible={showModal}
                    onClose={() => setShowModal(false)}
                    groupData={groupData}
                />
            </View>

            <ScrollView
                style={styles.messages}
                contentContainerStyle={styles.messagesContent}
            >
                {messages.map((message) => (
                    <View
                        key={message.id}
                        style={styles.message}
                    >
                        <Text style={styles.sender}>
                            {message.sender_name}
                        </Text>

                        <Text>
                            {message.message}
                        </Text>

                        <Text style={styles.timestamp}>
                            {new Date(
                                message.created_at
                            ).toLocaleDateString("en-NZ", {
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

            <MessageInput chatId={group?.chat_id} />
        </View>
    );
};

export default ChatBox;

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        margin: 10,
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
    },

    header: {
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 12,

        flexDirection: "row",
        alignItems: "center",
    },

    backButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 4,
    },

    backButtonText: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "500",
    },

    headerText: {
        flex: 1,
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
        marginHorizontal: 8,
    },

    manageButton: {
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },

    manageButtonText: {
        color: "#007AFF",
        fontWeight: "600",
        fontSize: 13,
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
});