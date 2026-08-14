import { Pressable, StyleSheet, Text, View } from "react-native";
import { Group } from "@/types/apiDataTypes";

type ChatHeaderProps = {
    group: Group;
    onBack: () => void;
    onCreateEvent: () => void;
    onManage: () => void;
};

const ChatHeader = ({group, onBack, onCreateEvent, onManage}: ChatHeaderProps) => {
    return (
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
                onPress={onCreateEvent}
            >
                <Text style={styles.eventButtonText}>
                    + Event
                </Text>
            </Pressable>

            <Pressable
                style={styles.manageButton}
                onPress={onManage}
            >
                <Text style={styles.manageButtonText}>
                    Manage
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default ChatHeader;