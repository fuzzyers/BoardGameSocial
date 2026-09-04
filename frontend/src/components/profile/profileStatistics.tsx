import { StyleSheet, Text, View } from "react-native";
import { ProfileData } from "@/types/apiDataTypes";

type ProfileStatsProps = {
    profile: ProfileData;
};

const ProfileStats = ({ profile }: ProfileStatsProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.stat}>
                <Text style={styles.number}>{profile.game_count}</Text>

                <Text style={styles.label}>Games</Text>
            </View>

            <View style={styles.stat}>
                <Text style={styles.number}>{profile.events_count}</Text>

                <Text style={styles.label}>Events</Text>
            </View>

            <View style={styles.stat}>
                <Text style={styles.number}>{profile.group_count}</Text>

                <Text style={styles.label}>Groups</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: 20,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },

    stat: {
        alignItems: "center",
    },

    number: {
        fontSize: 22,
        fontWeight: "bold",
    },

    label: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
});

export default ProfileStats;
