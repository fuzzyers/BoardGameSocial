import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { BGGSearchResult, searchBGGGameByID } from "../../../services/bgg";
import { createGame } from "@/services/games";
import { useState } from "react";

type BGGGameCardProps = {
    game: BGGSearchResult;
    onExpansionSelected: (game: BGGSearchResult | any) => void;
};

const BGGGameCard = ({ game, onExpansionSelected }: BGGGameCardProps) => {
    const [loadingExp, setLoadingExp] = useState(false);
    const [loadingGame, setLoadingGame] = useState(false);

    const handleAddGame = async () => {
        if (loadingGame) {
            return;
        }

        try {
            setLoadingGame(true);

            const gameById = await searchBGGGameByID(game.bgg_id);

            await createGame(gameById);
        } catch (error) {
            console.error("Failed to add game:", error);
        } finally {
            setLoadingGame(false);
        }
    };

    const handleAddExpansion = async () => {
        if (loadingExp) {
            return;
        }

        try {
            setLoadingExp(true);

            const gameById = await searchBGGGameByID(game.bgg_id);

            onExpansionSelected(gameById);
            console.log("Expansion selected:", gameById);
        } catch (error) {
            console.error("Failed to load expansion:", error);
        } finally {
            setLoadingExp(false);
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                    {game.title}
                </Text>

                {game.year_published && <Text style={styles.year}>{game.year_published}</Text>}
            </View>

            <View style={styles.actions}>
                <Pressable style={[styles.button, loadingGame && styles.disabled]} onPress={handleAddGame} disabled={loadingGame}>
                    {loadingGame ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Add Game</Text>}
                </Pressable>

                <Pressable
                    style={[styles.button, styles.expansionButton, loadingExp && styles.disabled]}
                    onPress={handleAddExpansion}
                    disabled={loadingExp}
                >
                    {loadingExp ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Add as Expansion</Text>}
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 8,
        padding: 14,
    },

    info: {
        flex: 1,
        paddingRight: 15,
        minWidth: 0,
    },

    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
    },

    year: {
        fontSize: 13,
        color: "#777",
        marginTop: 4,
    },

    actions: {
        gap: 8,
        alignItems: "flex-end",
    },

    button: {
        minWidth: 100,
        backgroundColor: "#4A90E2",
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },

    expansionButton: {
        backgroundColor: "#6B7280",
    },

    buttonText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
    },

    disabled: {
        opacity: 0.6,
    },
});

export default BGGGameCard;
