import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Group } from "@/types/apiDataTypes";
import MessageInput from "./messageInput";
import GroupManagment from "./groupManagment";
import CreateEventModal from "./newEventModal";
import ChatHeader from "./chatHeader";
import MessageList from "./messageList";
import { useGroupChat } from "@/hooks/useGroupChat";

type ChatBoxProps = {
    group: Group | null;
    onBack: () => void;
};

const ChatBox = ({ group, onBack }: ChatBoxProps) => {
    const [showModal, setShowModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);
    const { messages, groupData, loading } = useGroupChat(group);

    if (!group) {
        return null;
    }

    return (
        <View style={styles.chatContainer}>
            <ChatHeader
                group={group}
                onBack={onBack}
                onCreateEvent={() => setShowEventModal(true)}
                onManage={() => setShowModal(true)}
            />

            <MessageList messages={messages} loading={loading} />

            <View style={styles.inputContainer}>
                <MessageInput chatId={group.chat_id} />
            </View>

            <CreateEventModal visible={showEventModal} onClose={() => setShowEventModal(false)} groupId={group.id} />

            <GroupManagment visible={showModal} onClose={() => setShowModal(false)} groupData={groupData} />
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

    inputContainer: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
    },
});

export default ChatBox;
