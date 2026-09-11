import { Pressable, StyleSheet, Text, View } from "react-native";
import { ProfileData } from "@/types/apiDataTypes";
import { useRouter } from "expo-router";

type ProfileStatsProps = {
    profile: ProfileData;
};

const ProfileStats = ({ profile }: ProfileStatsProps) => {
    const router = useRouter();

    const handleReroute = (location: string) => {
        router.replace(`/(app)/profile/${location}/${profile.id}`)
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.stat} onPress={() => handleReroute("collection")}>
                <Text style={styles.number}>{profile.owned_game_count}</Text>

                <Text style={styles.label}>Games</Text>
            </Pressable>

            <Pressable style={styles.stat} onPress={() => handleReroute("wishlist")}>
                <Text style={styles.number}>{profile.wishlist_game_count}</Text>

                <Text style={styles.label}>Wishlist</Text>
            </Pressable>

            <Pressable style={styles.stat}>
                <Text style={styles.number}>{profile.events_count}</Text>

                <Text style={styles.label}>Events</Text>
            </Pressable>

            <Pressable style={styles.stat}>
                <Text style={styles.number}>{profile.group_count}</Text>

                <Text style={styles.label}>Groups</Text>
            </Pressable>
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
