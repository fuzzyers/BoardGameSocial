import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { BGGSearchResult, searchBGGGameByID } from "../../../services/bgg";
import { useState } from "react";
import { createGame } from "@/services/games";
import ListGamesModal from "./ListGamesModal";

type BGGGameCardProps = {
    game: BGGSearchResult;
};

const BGGGameCard = ({ game }: BGGGameCardProps) => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleAddGame = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const gameById = await searchBGGGameByID(game.bgg_id);

            await createGame(gameById);
        } catch (error) {
            console.error("Failed to add game:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddExpansion = () => {
        setShowModal(true);
    };

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.title}>{game.title}</Text>

                {game.year_published && <Text style={styles.year}>{game.year_published}</Text>}
            </View>

            <Pressable style={styles.button} onPress={() => handleAddGame()}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Add Game</Text>}
            </Pressable>

            <Pressable style={styles.button} onPress={() => handleAddExpansion()}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Add as Expansion</Text>}
            </Pressable>

            <ListGamesModal showModal={showModal} setShowModal={setShowModal} />
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

    button: {
        backgroundColor: "#4A90E2",
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 6,
    },

    buttonText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
    },
});

export default BGGGameCard;
