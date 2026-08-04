import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import GroupDetailsSection from "./groupManagment/GroupDetailsSection";
import MemberList from "./groupManagment/memberList";
import UserSearch from "./groupManagment/userSearch";

type CreateGroupModalProps = {
    visible: boolean;
    onClose: () => void;
    groupData: any;
};

const GroupManagment = ({ visible, onClose, groupData }: CreateGroupModalProps) => {
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
                        Manage Group
                    </Text>

                    <GroupDetailsSection groupData={groupData} />
                    <MemberList groupData={groupData} />
                    <UserSearch groupData={groupData} />

                    <View style={styles.buttons}>
                        <Pressable
                            style={[styles.button, styles.closeButton]}
                            onPress={onClose}
                        >
                            <Text>
                                Close
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

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

    closeButton: {
        backgroundColor: "#ddd",
    },
});

export default GroupManagment