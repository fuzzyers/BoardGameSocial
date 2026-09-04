import { deleteGroup } from "@/services/groups";
import { GroupDetails } from "@/types/apiDataTypes";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type GroupDetailsSectionProps = {
    groupData: GroupDetails | null;
};

const GroupDetailsSection = ({ groupData }: GroupDetailsSectionProps) => {
    const handleDeleteGroup = () => {
        console.log(groupData?.id);

        if (!groupData?.id) return;

        deleteGroup(groupData?.id);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Group Details</Text>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Group Name:</Text>
                <Text style={styles.detailValue}>{groupData?.name || "N/A"}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Created On:</Text>
                <Text style={styles.detailValue}>
                    {groupData?.created_at ? new Date(groupData.created_at).toLocaleDateString() : "N/A"}
                </Text>
            </View>
            <View>
                <Pressable style={styles.button} onPress={() => handleDeleteGroup()}>
                    <Text>Delete Group</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        marginBottom: 16,
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
    detailRow: {
        flexDirection: "row",
        marginBottom: 8,
    },
    detailLabel: {
        fontWeight: "600",
        marginRight: 8,
    },
    detailValue: {
        color: "#555",
    },
    button: {
        backgroundColor: "#ff4d4d",
        paddingVertical: 8,
    },
});

export default GroupDetailsSection;
