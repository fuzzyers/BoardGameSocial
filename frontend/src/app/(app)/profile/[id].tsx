import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import ProfileStats from "@/components/profile/profileStatistics";
import ProfileGames from "@/components/profile/profileGames";
import { useCallback, useEffect, useState } from "react";
import { getAnotherUserProfile } from "@/services/profile";
import ProfileHeaderByID from "@/components/profile/profileHeaderById";
import { ProfileData } from "@/types/apiDataTypes";

const ProfileByIdPage = () => {
    const [profile, setProfile] = useState<ProfileData | null>()
    const [loading, setLoading] = useState(true);
    const { id } = useLocalSearchParams();

    useFocusEffect(
        useCallback(() => {
            const getData = async () => {
                try {
                    setLoading(true);
                    const data = await getAnotherUserProfile(Number(id))
                    console.log(data)
                    setProfile(data)
                } catch (error) {
                    console.error("Failed to get profile:", error);
                    setProfile(null);
                } finally {
                    setLoading(false)
                }
  
            }

            getData()
        },[id])
    )

    if (loading) {
        return (
            <View style={styles.notFound}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!profile) {
        return (
            <View style={styles.notFound}>
                <Text style={styles.notFoundText}>Profile not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <ProfileHeaderByID profile={profile} />
            <ProfileStats profile={profile!} />
            <ProfileGames profile={profile!} owner={false}/>
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
