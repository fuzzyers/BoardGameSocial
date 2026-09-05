import GameExpansion from "@/components/gamesList/GameId/GameExpansion";
import GameHero from "@/components/gamesList/GameId/GameHero";
import GameInfo from "@/components/gamesList/GameId/GameInfo";
import { getGameById } from "@/services/games";
import { Game } from "@/types/apiDataTypes";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

const GamePage = () => {
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);

    const { gameid } = useLocalSearchParams<{
        gameid: string;
    }>();

    useEffect(() => {
        const fetchGameData = async () => {
            if (!gameid) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const response = await getGameById(Number(gameid));

                console.log("Fetched game data:", response);

                setGame(response);
            } catch (error) {
                console.error("Error fetching game data:", error);
                setGame(null);
            } finally {
                setLoading(false);
            }
        };

        fetchGameData();
    }, [gameid]);

    return (
        <>
            <Stack.Screen
                options={{
                    title: game?.title ?? "Game",
                }}
            />

            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" />
                        <Text style={styles.loadingText}>Loading game...</Text>
                    </View>
                ) : game ? (
                    <>
                        <GameHero game={game} />

                        <GameInfo game={game} />

                        {game.expansions?.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Expansions</Text>

                                {game.expansions.map((expansion) => (
                                    <GameExpansion key={expansion.id} expansion={expansion} />
                                ))}
                            </View>
                        )}
                    </>
                ) : (
                    <View style={styles.notFoundContainer}>
                        <Text style={styles.notFoundText}>Game not found.</Text>
                    </View>
                )}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },

    content: {
        padding: 16,
        paddingBottom: 40,
    },

    loadingContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },

    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: "#777",
    },

    notFoundContainer: {
        alignItems: "center",
        paddingVertical: 60,
    },

    notFoundText: {
        fontSize: 16,
        color: "#777",
    },

    section: {
        marginTop: 24,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12,
        color: "#222",
    },
});

export default GamePage;
