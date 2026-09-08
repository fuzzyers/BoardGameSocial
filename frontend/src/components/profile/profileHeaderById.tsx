import { ProfileData } from "@/types/apiDataTypes";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type ProfileHeaderProps = {
    profile: ProfileData;
};

const ProfileHeaderByID = ({ profile }: ProfileHeaderProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{profile.name.charAt(0).toUpperCase()}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.name}>{profile.name}</Text>

                <Text style={styles.username}>@{profile.username}</Text>

                <View style={styles.descriptionContainer}>
                    {profile.description ? (
                        <Text style={styles.description}>{profile.description}</Text>
                    ) : (
                        <Text style={styles.noDescription}>No bio yet</Text>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 16,
        padding: 20,
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#208AEF",
    },

    avatarText: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#fff",
    },

    info: {
        flex: 1,
    },

    name: {
        fontSize: 24,
        fontWeight: "bold",
    },

    username: {
        fontSize: 15,
        color: "#666",
        marginTop: 2,
    },

    descriptionContainer: {
        marginTop: 8,
    },

    description: {
        fontSize: 15,
    },

    noDescription: {
        fontSize: 15,
        color: "#888",
        fontStyle: "italic",
    },

    editText: {
        marginTop: 6,
        fontSize: 14,
        color: "#208AEF",
        fontWeight: "600",
    },

    editContainer: {
        marginTop: 8,
    },

    input: {
        minHeight: 80,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 15,
        textAlignVertical: "top",
    },

    buttons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 8,
        marginTop: 8,
    },

    cancelButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },

    cancelText: {
        color: "#666",
    },

    saveButton: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 6,
        backgroundColor: "#208AEF",
    },

    saveText: {
        color: "#fff",
        fontWeight: "600",
    },
});

export default ProfileHeaderByID;
