import GamesList from "@/components/gamesList/gamesList";
import { Game } from "@/types/apiDataTypes";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";


const ProfileWishlistByIdPage = () => {
    const [games, setGames] = useState<Game[]>()
    const [loading, setLoading] = useState(true)
    const { id } = useLocalSearchParams();

    useFocusEffect(
        useCallback(() => {
            const getData = async () => {
                try {
                    setLoading(true)
                } catch (error) {
                    
                } finally {
                    setLoading(false)
                }
            }

            getData()
        },[id])
    )

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" />
                <Text>Loading event...</Text>
            </View>
        ); 
    }

    return (
        <View>
            { games ? (
                <GamesList
                    games={games}
                    selectedTab="view"
                />
            ) : (
                <Text>
                    No games found
                </Text>
            )}
        </View>
    );
};

export default ProfileWishlistByIdPage;
