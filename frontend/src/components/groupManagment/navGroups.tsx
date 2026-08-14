import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useState } from "react";
import CreateGroupModal from "./createGroupModal";
import { Group } from "@/types/apiDataTypes";
import { getSocket } from "@/services/socket";

type NavGroupProps = {
    groups: Group[];
    onSelectGroup: (group: Group) => void;
};

const NavGroups = ({ groups, onSelectGroup }: NavGroupProps) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

    const { width } = useWindowDimensions();
    const isMobile = width < 600;

    const handleGroupSelect = (group: Group) => {
        onSelectGroup(group);
        setSelectedGroupId(group.id);

        const socket = getSocket();

        if (!socket) return;

        socket.emit("joinRoom", group.chat_id);
    };

    return (
        <>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Groups</Text>
                    <Text style={styles.subtitle}>
                        {groups.length} {groups.length === 1 ? "group" : "groups"}
                    </Text>
                </View>

                <Pressable style={styles.createButton} onPress={() => setShowModal(true)}>
                    <Text style={styles.createButtonText}>+</Text>
                    {!isMobile && <Text style={styles.createButtonLabel}>Create Group</Text>}
                </Pressable>
            </View>

            <CreateGroupModal visible={showModal} onClose={() => setShowModal(false)} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.groupList}>
                {groups.map((group) => (
                    <Pressable
                        key={group.id}
                        style={[styles.groupItem, selectedGroupId === group.id && styles.selectedGroupItem]}
                        onPress={() => handleGroupSelect(group)}
                    >
                        <View style={[styles.groupIcon, selectedGroupId === group.id && styles.selectedGroupIcon]}>
                            <Text style={[styles.groupIconText, selectedGroupId === group.id && styles.selectedGroupIconText]}>
                                {group.name.charAt(0).toUpperCase()}
                            </Text>
                        </View>

                        <View style={styles.groupInfo}>
                            <Text
                                numberOfLines={1}
                                style={[styles.groupName, selectedGroupId === group.id && styles.selectedGroupName]}
                            >
                                {group.name}
                            </Text>

                            {group.description && (
                                <Text numberOfLines={1} style={styles.groupDescription}>
                                    {group.description}
                                </Text>
                            )}
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#111827",
    },

    subtitle: {
        marginTop: 2,
        fontSize: 13,
        color: "#6B7280",
    },

    createButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "#007AFF",
    },

    createButtonText: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "500",
        lineHeight: 22,
    },

    createButtonLabel: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },

    groupList: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 4,
    },

    mobileGroupList: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 8,
    },

    groupItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
    },

    desktopGroupItem: {
        minHeight: 58,
    },

    selectedGroupItem: {
        backgroundColor: "#F3F8FF",
        borderLeftWidth: 3,
        borderLeftColor: "#007AFF",
    },

    groupIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E5E7EB",
        marginRight: 10,
    },

    selectedGroupIcon: {
        backgroundColor: "#007AFF",
    },

    groupIconText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#4B5563",
    },

    selectedGroupIconText: {
        color: "#FFFFFF",
    },

    groupInfo: {
        flex: 1,
        minWidth: 0,
    },

    groupName: {
        fontSize: 15,
        fontWeight: "600",
        color: "#374151",
    },

    selectedGroupName: {
        color: "#005FCC",
    },

    groupDescription: {
        marginTop: 2,
        fontSize: 12,
        color: "#9CA3AF",
    },
});

export default NavGroups;
