import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View} from "react-native";

type CreateEventModalProps = {
    visible: boolean;
    onClose: () => void;
    groupId: number;
};

const CreateEventModal = ({
    visible,
    onClose,
    groupId,
}: CreateEventModalProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleCreate = async () => {
        if (!name.trim()) return;

        try {
            // Add your create event service here
            console.log({
                name,
                description,
                groupId,
            });

            setName("");
            setDescription("");
            onClose();
        } catch (error) {
            console.error("Failed to create event:", error);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>
                        Create Event
                    </Text>

                    <Text style={styles.label}>
                        Event Name
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Game night"
                    />

                    <Text style={styles.label}>
                        Description
                    </Text>

                    <TextInput
                        style={[
                            styles.input,
                            styles.descriptionInput,
                        ]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="What's happening?"
                        multiline
                    />

                    <View style={styles.actions}>
                        <Pressable
                            style={styles.cancelButton}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelText}>
                                Cancel
                            </Text>
                        </Pressable>

                        <Pressable
                            style={styles.createButton}
                            onPress={handleCreate}
                        >
                            <Text style={styles.createText}>
                                Create Event
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CreateEventModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    modal: {
        width: "100%",
        maxWidth: 500,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 20,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 6,
    },

    input: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        marginBottom: 16,
    },

    descriptionInput: {
        minHeight: 90,
        textAlignVertical: "top",
    },

    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: 4,
    },

    cancelButton: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8,
    },

    cancelText: {
        color: "#6B7280",
        fontWeight: "600",
    },

    createButton: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: "#007AFF",
    },

    createText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
});