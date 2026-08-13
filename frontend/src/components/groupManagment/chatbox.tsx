import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable} from "react-native";
import MessageInput from "./messageInput";
import { Group } from "@/types/apiDataTypes";
import GroupManagment from "./groupManagment";
import CreateEventModal from "./newEventModal";
import { useGroupChat } from "@/hooks/useGroupChat";

type ChatBoxProps = {
    group: Group | null;
    onBack: () => void;
};

const ChatBox = ({ group, onBack }: ChatBoxProps) => {
    const [showModal, setShowModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);
    const {messages, groupData, loading} = useGroupChat(group);

    if (!group) {
        return null;
    }

    return (
        <View style={styles.chatContainer}>

            {/* HEADER */}
            <View style={styles.header}>

                <Pressable
                    style={styles.backButton}
                    onPress={onBack}
                >
                    <Text style={styles.backButtonText}>
                        ←
                    </Text>
                </Pressable>

                <View style={styles.groupHeaderInfo}>
                    <Text
                        style={styles.headerText}
                        numberOfLines={1}
                    >
                        {group.name}
                    </Text>

                    {group.description && (
                        <Text
                            style={styles.headerDescription}
                            numberOfLines={1}
                        >
                            {group.description}
                        </Text>
                    )}
                </View>

                <Pressable
                    style={styles.eventButton}
                    onPress={() => setShowEventModal(true)}
                >
                    <Text style={styles.eventButtonText}>
                        + Event
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.manageButton}
                    onPress={() => setShowModal(true)}
                >
                    <Text style={styles.manageButtonText}>
                        Manage
                    </Text>
                </Pressable>

            </View>

            {/* MODALS */}

            <CreateEventModal
                visible={showEventModal}
                onClose={() => setShowEventModal(false)}
                groupId={group.id}
            />

            <GroupManagment
                visible={showModal}
                onClose={() => setShowModal(false)}
                groupData={groupData}
            />

            {/* MESSAGES */}

            <ScrollView
                style={styles.messages}
                contentContainerStyle={styles.messagesContent}
            >
                {loading ? (
                    <Text>Loading messages...</Text>
                ) : (
                    messages.map((message) => (
                        <View
                            key={message.id}
                            style={styles.message}
                        >
                            <View style={styles.messageHeader}>
                                <Text style={styles.sender}>
                                    {message.sender_name}
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

                            <Text style={styles.messageText}>
                                {message.message}
                            </Text>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* INPUT */}

            <View style={styles.inputContainer}>
                <MessageInput chatId={group.chat_id} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        overflow: "hidden",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },

    header: {
        minHeight: 72,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,

        backgroundColor: "#FFFFFF",

        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },

    backButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
        borderRadius: 20,
    },

    backButtonText: {
        fontSize: 26,
        color: "#374151",
    },

    groupHeaderInfo: {
        flex: 1,
        minWidth: 0,
    },

    headerText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },

    headerDescription: {
        marginTop: 2,
        fontSize: 12,
        color: "#6B7280",
    },

    manageButton: {
        marginLeft: 12,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "#F3F4F6",
    },

    manageButtonText: {
        color: "#374151",
        fontSize: 13,
        fontWeight: "600",
    },

    messages: {
        flex: 1,
    },

    messagesContent: {
        padding: 20,
    },

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

    inputContainer: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
    },
    eventButton: {
        marginLeft: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "#F3F8FF",
        borderWidth: 1,
        borderColor: "#D6E9FF",
    },

    eventButtonText: {
        color: "#007AFF",
        fontSize: 13,
        fontWeight: "600",
    },
});

export default ChatBox;