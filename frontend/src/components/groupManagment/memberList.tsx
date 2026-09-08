import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { GroupDetails } from "@/types/apiDataTypes";
import { removeUserFromGroup } from "@/services/groups";
import { useRouter } from "expo-router";
import { errorStyle } from "@/styles/error";

type MemberListProps = {
    groupData: GroupDetails | null;
};

const MemberList = ({ groupData }: MemberListProps) => {
    const [groupDataState, setGroupDataState] = useState<GroupDetails | null>(groupData);
    const [error, setError] = useState("")
    const router = useRouter()
    
    useEffect(() => {
        setGroupDataState(groupData);
    }, [groupData]);

    const handleRemoveUser = async (groupId: number, userId: number) => {
        try {
            setError("")
            const response = await removeUserFromGroup(groupId, userId);

            if (groupDataState) {
                const updatedMembers = groupDataState.members.filter((member) => member.id !== userId);
                setGroupDataState({ ...groupDataState, members: updatedMembers });
            }
        } catch (error) {
            setError("You are not permitted to use this function")
            console.error("Error removing user from group:", error);
        }
    };

    const handleProfileNavigation = (id: number) => {
        router.replace(`/(app)/profile/${id}`)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Members</Text>
            {groupDataState?.members.map((member, index) => (
                <View key={index} style={styles.memberRow}>
                    <Pressable style={styles.memberProfile} onPress={() => handleProfileNavigation(member.id)}>
                        <Text style={styles.memberName}>{member.name}</Text>
                        <Text style={styles.roleText}>{member.role}</Text>
                    </Pressable>
                    {member.role !== "owner" && (
                        <Pressable style={styles.removeButton} onPress={() => handleRemoveUser(groupDataState?.id, member.id)}>
                            <Text style={styles.removeButtonText}>Remove</Text>
                        </Pressable>
                    )}
                </View>
            ))}
            {error && <Text style={errorStyle.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    memberRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    memberName: {
        fontSize: 16,
        flex:1
    },
    removeButton: {
        backgroundColor: "#ff4d4d",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    removeButtonText: {
        color: "#fff",
        fontSize: 14,
    },
    roleText: {
        fontSize: 14,
        color: "#555",
        paddingRight: 10
    },
    memberProfile: {
        flex:1,
        flexDirection: "row"
    }
});

export default MemberList;
