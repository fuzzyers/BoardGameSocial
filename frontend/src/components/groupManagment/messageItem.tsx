import { StyleSheet, Text, View } from "react-native";
import { Message } from "@/types/apiDataTypes";

type MessageItemProps = {
    message: Message;
};

const MessageItem = ({ message }: MessageItemProps) => {
    const timestamp = new Date(message.created_at).toLocaleDateString("en-NZ", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"});
    
    return (
        <View style={styles.message}>
            <View style={styles.messageHeader}>
                <Text style={styles.sender}>
                    {message.sender_name}
                </Text>

                <Text style={styles.timestamp}>
                    {timestamp}
                </Text>
            </View>

            <Text style={styles.messageText}>
                {message.message}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    message: {
        marginBottom: 18,
    },

    messageHeader: {
        flexDirection: "row",
        alignItems: "baseline",
        marginBottom: 4,
    },

    sender: {
        fontSize: 14,
        fontWeight: "700",
        color: "#111827",
    },

    timestamp: {
        marginLeft: 8,
        fontSize: 11,
        color: "#9CA3AF",
    },

    messageText: {
        fontSize: 15,
        lineHeight: 21,
        color: "#374151",
    },
});

export default MessageItem;