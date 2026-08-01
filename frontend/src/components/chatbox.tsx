import { getGroupMessages } from "@/services/messages";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import MessageInput from "./messageInput";

type Group = {
    id: number;
    name: string;
    description: string;
    created_at: string;
    chat_id: number;
};

type ChatBoxProps = {
    group: Group | null;
};

type Message = {
    id: number;
    sender_name: string;
    message: string;
    created_at: Date;
};

const ChatBox = ({group}: ChatBoxProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const groupName = "Gaming Group";

    useEffect(() => {
        if (!group) return;
        console.log(group)
        const loadMessages = async () => {
            const response = await getGroupMessages(group.id);

            if (!response) return;
            console.log(response)
            setMessages(response.messages);
        };

        loadMessages();
    }, [group]);

    return (
        <View style={styles.chatContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{groupName}</Text>
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
});