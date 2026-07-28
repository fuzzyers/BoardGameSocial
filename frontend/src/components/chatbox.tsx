import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";

const ChatBox = () => {
    const groupName = "Gaming Group";

    const demoMessages = [
        { id: 1, sender: "Alice", content: "Hello!", timestamp: "10:00 AM" },
        { id: 2, sender: "Bob", content: "Hi there!", timestamp: "10:02 AM" },
        { id: 3, sender: "Alice", content: "How are you?", timestamp: "10:03 AM" },
        { id: 4, sender: "Bob", content: "I'm good, thanks! How about you?", timestamp: "10:05 AM" },
        { id: 5, sender: "Alice", content: "I'm doing well too!", timestamp: "10:06 AM" },
    ];

    return (
        <View style={styles.chatContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{groupName}</Text>
            </View>

            <ScrollView
                style={styles.messages}
                contentContainerStyle={styles.messagesContent}
            >
                {demoMessages.map((message) => (
                    <View key={message.id} style={styles.message}>
                        <Text style={styles.sender}>
                            {message.sender}
                        </Text>
                        <Text>{message.content}</Text>
                        <Text style={styles.timestamp}>
                            {message.timestamp}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Type a message..."
                    style={styles.textInput}
                />
            </View>
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