import { sendMessage } from "@/services/messages";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type MessageInputProps = {
    chatId?: number;
};

const MessageInput = ({ chatId }: MessageInputProps) => {
    const [message, setMessage] = useState("");

    const handleSendMessage = async () => {
        if (!chatId || !message.trim()) return;

        try {
            await sendMessage(chatId, message.trim());
            setMessage("");
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Type a message..."
                style={styles.textInput}
                value={message}
                onChangeText={setMessage}
                returnKeyType="send"
                onSubmitEditing={handleSendMessage}
                blurOnSubmit={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        padding: 12,
        backgroundColor: "#fafafa",
    },
    textInput: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
});

export default MessageInput;