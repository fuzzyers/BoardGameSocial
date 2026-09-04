import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { fakeProfiles } from "@/data/fakeProfile";
import ProfileHeader from "@/components/profile/profileHeader";
import ProfileStats from "@/components/profile/profileStatistics";
import ProfileGames from "@/components/profile/profileGames";

const ProfileByIdPage = () => {
    const { id } = useLocalSearchParams();

    const profileId = Number(id);

    const profile = fakeProfiles.find((profile) => profile.id === profileId);

    if (!profile) {
        return (
            <View style={styles.notFound}>
                <Text style={styles.notFoundText}>Profile not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <ProfileHeader profile={profile} />

            <ProfileStats profile={profile} />

            <ProfileGames profile={profile} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        paddingBottom: 40,
    },

    notFound: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    notFoundText: {
        fontSize: 18,
    },
});

export default ProfileByIdPage;
