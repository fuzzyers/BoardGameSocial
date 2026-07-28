import { Modal, View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { createGroup } from "@/services/groups";

type CreateGroupModalProps = {
    visible: boolean;
    onClose: () => void;
};

const CreateGroupModal = ({ visible, onClose }: CreateGroupModalProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleCreate = () => {
        createGroup(name, description)

        setName("");
        setDescription("");
        onClose();
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
                        Create Group
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Group Name"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={[styles.input, styles.description]}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />

                    <View style={styles.buttons}>
                        <Pressable
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text>
                                Cancel
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[styles.button, styles.createButton]}
                            onPress={handleCreate}
                        >
                            <Text style={styles.createText}>
                                Create
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CreateGroupModal;


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    modal: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 8,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },

    description: {
        height: 100,
        textAlignVertical: "top",
    },

    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 5,
    },

    cancelButton: {
        backgroundColor: "#ddd",
    },

    createButton: {
        backgroundColor: "#007AFF",
    },

    createText: {
        color: "white",
        fontWeight: "600",
    },
});