import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import GroupDetailsSection from "./GroupDetailsSection";
import MemberList from "./memberList";
import UserSearch from "./userSearch";
import Button from "../generalComponents/Button";
import { deleteGroup, leaveGroup } from "@/services/groups";
import { useRouter } from "expo-router";

type CreateGroupModalProps = {
    visible: boolean;
    onClose: () => void;
    groupData: any;
};

const GroupManagment = ({ visible, onClose, groupData }: CreateGroupModalProps) => {
    const router = useRouter();

    const handleEditGroup = () => {
        console.log("Edit group");
    };

    const handleManageRoles = () => {
        console.log("Manage roles");
    };

    const handleDeleteGroup = async () => {
        await deleteGroup(groupData.id);
        onClose();
        router.back();
    };

    const handleLeaveGroup = async () => {
        await leaveGroup(groupData.id);
        onClose();
        router.back();
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.title}>Manage Group</Text>

                            <Text style={styles.subtitle}>Manage your group settings and members</Text>
                        </View>

                        <Pressable style={({ pressed }) => [styles.closeIcon, pressed && styles.pressed]} onPress={onClose}>
                            <Text style={styles.closeIconText}>✕</Text>
                        </Pressable>
                    </View>

                    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Group</Text>
                            {/* <Pressable
                                style={({ pressed }) => [
                                    styles.actionButton,
                                    pressed && styles.pressed,
                                ]}
                                onPress={handleEditGroup}
                            >
                                <View>
                                    <Text style={styles.actionTitle}>
                                        Edit Group
                                    </Text>

                                    <Text style={styles.actionDescription}>
                                        Change the group name or description
                                    </Text>
                                </View>

                                <Text style={styles.chevron}>
                                    ›
                                </Text>
                            </Pressable> */}
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Members</Text>

                            <MemberList groupData={groupData} />

                            <UserSearch groupData={groupData} />
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Management</Text>

                            {/* <Pressable
                                style={({ pressed }) => [
                                    styles.actionButton,
                                    pressed && styles.pressed,
                                ]}
                                onPress={handleManageRoles}
                            >
                                <View>
                                    <Text style={styles.actionTitle}>
                                        Manage Roles
                                    </Text>

                                    <Text style={styles.actionDescription}>
                                        Manage owners, admins and members
                                    </Text>
                                </View>

                                <Text style={styles.chevron}>
                                    ›
                                </Text>
                            </Pressable>*/}
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Danger Zone</Text>

                            <Button
                                title={"Leave Group"}
                                onPress={() => handleLeaveGroup()}
                                variant={"dangerOutline"}
                                disabled={false}
                            />

                            <Button
                                title={"Delete Group"}
                                onPress={() => handleDeleteGroup()}
                                variant={"dangerOutline"}
                                disabled={false}
                            />
                        </View>
                    </ScrollView>

                    <View style={styles.footer}>
                        <Button title={"Close"} onPress={() => onClose()} variant={"secondary"} disabled={false} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.55)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    modal: {
        width: "100%",
        maxWidth: 650,
        maxHeight: "90%",
        backgroundColor: "#f8f9fb",
        borderRadius: 16,
        overflow: "hidden",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 18,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#222",
    },

    subtitle: {
        marginTop: 4,
        fontSize: 13,
        color: "#777",
    },

    closeIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f1f3f5",
    },

    closeIconText: {
        fontSize: 16,
        color: "#555",
        fontWeight: "700",
    },

    scroll: {
        flexGrow: 0,
    },

    content: {
        padding: 16,
        paddingBottom: 8,
    },

    section: {
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#555",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    actionButton: {
        marginTop: 10,
        paddingHorizontal: 14,
        paddingVertical: 13,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e2e5e9",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    actionTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#222",
    },

    actionDescription: {
        marginTop: 3,
        fontSize: 12,
        color: "#888",
    },

    chevron: {
        fontSize: 24,
        color: "#999",
        marginLeft: 10,
    },

    dangerButton: {
        marginTop: 8,
        paddingHorizontal: 14,
        paddingVertical: 13,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#f0b7b7",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    dangerTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#c62828",
    },

    deleteButton: {
        marginTop: 8,
        paddingHorizontal: 14,
        paddingVertical: 13,
        backgroundColor: "#fff5f5",
        borderWidth: 1,
        borderColor: "#ef9a9a",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    deleteTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#b71c1c",
    },

    footer: {
        padding: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
    },

    closeButton: {
        paddingVertical: 12,
        borderRadius: 9,
        backgroundColor: "#e5e7eb",
        alignItems: "center",
    },

    closeButtonText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#333",
    },

    pressed: {
        opacity: 0.65,
    },
});

export default GroupManagment;
