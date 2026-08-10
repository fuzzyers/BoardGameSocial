import { Pressable, StyleSheet, Text } from "react-native";
import { addUserToGroup } from "@/services/groups";

const AddUserButton = ({ userId, groupId }: { userId: number; groupId: number | undefined }) => {
    const handleAddUser = async () => {
        if (!groupId) {
            console.error("Group ID is undefined");
            return;
        }
        const response = await addUserToGroup(groupId, userId);

        console.log("Add user response:", response);
    };

    return (
        <Pressable style={styles.button} onPress={handleAddUser}>
            <Text style={styles.buttonText}>Add User</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AddUserButton;
