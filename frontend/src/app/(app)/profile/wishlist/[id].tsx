import GamesList from "@/components/gamesList/gamesList";
import { useProfile } from "@/context/profileContext";
import { getAnotherUserProfile } from "@/services/profile";
import { ProfileData } from "@/types/apiDataTypes";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, useWindowDimensions, View } from "react-native";

const ProfileWishlistByIdPage = () => {
    const [activeProfile, setActiveProfile] = useState<ProfileData | null>();
    const { id } = useLocalSearchParams();
    const { profile } = useProfile();
    const { width } = useWindowDimensions();
    const [loading, setLoading] = useState(true);
    const isMobile = width < 768;

    useFocusEffect(
        useCallback(() => {
            const loadProfile = async () => {
                if (!id) return;

                setLoading(true);

                const profileId = Number(id);

                if (profile && profile.id === profileId) {
                    setActiveProfile(profile);
                    setLoading(false);
                    return;
                }

                try {
                    const response = await getAnotherUserProfile(profileId);
                    setActiveProfile(response);
                } catch (error) {
                    console.error("Failed to load profile:", error);
                    setActiveProfile(null);
                } finally {
                    setLoading(false);
                }
            };
            loadProfile();
        }, [id, profile])
    );

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}> Loading wishlist... </Text>
            </View>
        );
    }

    if (!activeProfile) {
        return (
            <View style={styles.error}>
                <Text style={styles.errorTitle}> Profile not found </Text>
                <Text style={styles.errorText}> We couldn't load this user's wishlist. </Text>
            </View>
        );
    }

    return (
        <View style={styles.page}>
            <View style={[styles.container, isMobile && styles.mobileContainer]}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}> 
                            {activeProfile.name.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.headerText}>
                        <Text style={styles.title} numberOfLines={1}>
                            {activeProfile.name}'s Wishlist
                        </Text>
                        <Text style={styles.subtitle}>
                            {activeProfile.wishlist_game_count} {activeProfile.wishlist_game_count === "1" ? "game" : "games"}
                        </Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.listContainer}>
                    {activeProfile.wishlist_game_count !== "0" ? (
                        <GamesList games={activeProfile.wishlist_games} selectedTab="view" />
                    ) : (
                        <View style={styles.empty}>
                            <Text style={styles.emptyTitle}> No games yet </Text>
                            <Text style={styles.emptyText}> This wishlist doesn't have any games. </Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#f4f5f7",
    },

    container: {
        flex: 1,
        width: "100%",
        maxWidth: 1200,
        alignSelf: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 5,
    },

    mobileContainer: {
        borderRadius: 0,
        shadowOpacity: 0,
        elevation: 0,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 20,
        gap: 14,
    },

    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#208AEF",
        alignItems: "center",
        justifyContent: "center",
    },

    avatarText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
    },

    headerText: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1f2937",
    },

    subtitle: {
        marginTop: 4,
        fontSize: 14,
        color: "#6b7280",
    },

    divider: {
        height: 1,
        backgroundColor: "#e5e7eb",
    },

    listContainer: {
        flex: 1,
        minHeight: 0,
    },

    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
    },

    emptyTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#374151",
    },

    emptyText: {
        marginTop: 6,
        fontSize: 14,
        color: "#6b7280",
        textAlign: "center",
    },

    loading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
    },

    loadingText: {
        fontSize: 14,
        color: "#6b7280",
    },

    error: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
    },

    errorTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#374151",
    },

    errorText: {
        marginTop: 6,
        fontSize: 14,
        color: "#6b7280",
        textAlign: "center",
    },
});
export default ProfileWishlistByIdPage;
