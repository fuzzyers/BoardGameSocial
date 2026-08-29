import { useState } from "react";
import {
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

    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        setShowModal(false);

        try {
            await deleteEvent(group_id, eventId);
        } catch (error) {
            console.error("Failed to delete event:", error);
        }
    };

    return (
        <>
            <Pressable
                style={styles.button}
                onPress={() => setShowModal(true)}
            >
                <Text style={styles.text}>
                    Delete Event
                </Text>
            </Pressable>

            <Modal
                visible={showModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
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
                                style={styles.cancelButton}
                                onPress={() => setShowModal(false)}
                            >
                                <Text style={styles.cancelText}>
                                    Cancel
                                </Text>
                            </Pressable>

                            <Pressable
                                style={styles.deleteButton}
                                onPress={handleDelete}
                            >
                                <Text style={styles.deleteText}>
                                    Delete
                                </Text>
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
});

export default DeleteEventButton;