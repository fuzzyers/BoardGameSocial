import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ProfileHeader from "@/components/profile/profileHeader";
import ProfileStats from "@/components/profile/profileStatistics";
import ProfileGames from "@/components/profile/profileGames";
import { useMyProfile } from "@/hooks/useMyProfile";

const ProfilePage = () => {
    const { profile, loading, error, updateProfileDescription } = useMyProfile();

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.error}>
                <Text>Unable to load your profile.</Text>
            </View>
        );
    }


    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <ProfileHeader profile={profile!} updateDescription={updateProfileDescription} />
            <ProfileStats profile={profile!} />
            {/* <ProfileGames profile={profile} /> */}
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

    title: {
        fontSize: 28,
        fontWeight: "bold",
        margin: 20,
    },

    loading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    error: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ProfilePage;
