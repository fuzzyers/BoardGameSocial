import { ScrollView, StyleSheet, Text } from "react-native";
import { Message } from "@/types/apiDataTypes";
import MessageItem from "./messageItem";

type MessageListProps = {
    messages: Message[];
    loading: boolean;
};

const MessageList = ({ messages, loading }: MessageListProps) => {
    return (
        <ScrollView style={styles.messages} contentContainerStyle={styles.messagesContent}>
            {loading ? (
                <Text style={styles.loading}>Loading messages...</Text>
            ) : (
                messages.map((message) => <MessageItem key={message.id} message={message} />)
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    messages: {
        flex: 1,
    },

    messagesContent: {
        padding: 20,
    },

    loading: {
        color: "#6B7280",
        fontSize: 14,
    },
});

export default MessageList;
