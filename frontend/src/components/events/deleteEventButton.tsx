import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { deleteEvent } from "@/services/event";

type DeleteEventButtonProps = {
    eventId: number;
    group_id: number;
};

const DeleteEventButton = ({
    eventId,
    group_id,
}: DeleteEventButtonProps) => {

    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setDeleting(true);

            await deleteEvent(group_id, eventId);

            setShowModal(false);

            // Navigate back to events and refresh the page
            router.replace("/events");
        } catch (error) {
            console.error("Failed to delete event:", error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <Pressable
                style={styles.button}
                onPress={() => setShowModal(true)}
                disabled={deleting}
            >
                <Text style={styles.text}>
                    Delete Event
                </Text>
            </Pressable>

            <Modal
                visible={showModal}
                transparent
                animationType="fade"
                onRequestClose={() => {
                    if (!deleting) {
                        setShowModal(false);
                    }
                }}
            >
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.title}>
                            Delete Event
                        </Text>

                        <Text style={styles.message}>
                            Are you sure you want to delete this event?
                            This cannot be undone.
                        </Text>

                        <View style={styles.actions}>
                            <Pressable
                                style={[
                                    styles.cancelButton,
                                    deleting && styles.disabled,
                                ]}
                                onPress={() => setShowModal(false)}
                                disabled={deleting}
                            >
                                <Text style={styles.cancelText}>
                                    Cancel
                                </Text>
                            </Pressable>

                            <Pressable
                                style={[
                                    styles.deleteButton,
                                    deleting && styles.disabled,
                                ]}
                                onPress={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? (
                                    <View style={styles.loading}>
                                        <ActivityIndicator
                                            size="small"
                                            color="#fff"
                                        />
                                        <Text style={styles.deleteText}>
                                            Deleting...
                                        </Text>
                                    </View>
                                ) : (
                                    <Text style={styles.deleteText}>
                                        Delete
                                    </Text>
                                )}
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#b94444",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },

    modal: {
        width: "100%",
        maxWidth: 450,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 24,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 12,
    },

    message: {
        fontSize: 15,
        color: "#555",
        lineHeight: 22,
        marginBottom: 24,
    },

    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
    },

    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        backgroundColor: "#eee",
    },

    cancelText: {
        fontSize: 15,
        fontWeight: "600",
    },

    deleteButton: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        backgroundColor: "#b94444",
    },

    deleteText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },

    loading: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    disabled: {
        opacity: 0.6,
    },
});

export default DeleteEventButton;
