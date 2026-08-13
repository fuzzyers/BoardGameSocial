import { useEffect, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Group } from "@/types/apiDataTypes";
import NavGroups from "@/components/groupManagment/navGroups";
import ChatBox from "@/components/groupManagment/chatbox";
import { getGroups } from "@/services/groups";
import { getSocket } from "@/services/socket";

const Groups = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    const { width } = useWindowDimensions();

    const isDesktop = width >= 768;

    const loadGroups = async () => {
        try {
            const data = await getGroups();

            if (Array.isArray(data)) {
                setGroups(data);
            }
        } catch (error) {
            console.error("Failed to load groups:", error);
        }
    };

    useEffect(() => {
        loadGroups();
    }, []);

    useEffect(() => {
        const socket = getSocket();

        if (!socket) return;

        const handleGroupCreated = () => {
            loadGroups();
        };

        socket.on("group_created", handleGroupCreated);

        return () => {
            socket.off("group_created", handleGroupCreated);
        };
    }, []);

    /*
     * DESKTOP
     *
     * Groups stay visible on the left and ChatBox
     * stays visible on the right.
     */
    if (isDesktop) {
        return (
            <View style={styles.desktopContainer}>
                <View style={styles.sidebar}>
                    <NavGroups
                        groups={groups}
                        onSelectGroup={setSelectedGroup}
                    />
                </View>

                <View style={styles.chatArea}>
                    {selectedGroup ? (
                        <ChatBox
                            group={selectedGroup}
                            onBack={() => setSelectedGroup(null)}
                        />
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyTitle}>
                                Select a group
                            </Text>

                            <Text style={styles.emptyText}>
                                Choose a group from the list to start chatting.
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        );
    }

    /*
     * MOBILE
     *
     * Keep your existing behaviour where the group list
     * and chat replace each other.
     */
    return (
        <View style={styles.mobileContainer}>
            {selectedGroup === null ? (
                <NavGroups
                    groups={groups}
                    onSelectGroup={setSelectedGroup}
                />
            ) : (
                <ChatBox
                    group={selectedGroup}
                    onBack={() => setSelectedGroup(null)}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    desktopContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#F5F7FA",
    },

    sidebar: {
        width: 300,
        backgroundColor: "#FFFFFF",
        borderRightWidth: 1,
        borderRightColor: "#E5E7EB",
    },

    chatArea: {
        flex: 1,
        padding: 12,
    },

    mobileContainer: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },

    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#374151",
    },

    emptyText: {
        marginTop: 6,
        fontSize: 14,
        color: "#6B7280",
    },
});

export default Groups;