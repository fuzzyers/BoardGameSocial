import useGameAction from "@/hooks/useGameAction";
import { Game } from "@/types/apiDataTypes";
import { StyleSheet, Text, View } from "react-native";
import GameActionButton from "../GamesCard/gameActionButton";
import { useEffect } from "react";

type GameExpansionProps = {
    expansion: Game;
};

export const GameExpansion = ({ expansion }: GameExpansionProps) => {
    const { action, loading, status, button } = useGameAction({
        game: expansion,
        selectedTab: "database",
    });
    useEffect(() => {
        console.log(expansion);
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.infoCard}>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{expansion.title}</Text>

                        {expansion.year_published && <Text style={styles.year}>{expansion.year_published}</Text>}
                    </View>

                    {button && (
                        <GameActionButton
                            title="+"
                            loadingTitle="..."
                            successTitle="✓"
                            errorTitle="✕"
                            adding={loading}
                            status={status}
                            onPress={action}
                        />
                    )}
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Average Rating:</Text>

                    <Text style={styles.infoValue}>{expansion.average_rating?.toFixed(1)}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },

    infoCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    titleContainer: {
        flex: 1,
        marginRight: 12,
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#222",
    },

    year: {
        marginTop: 3,
        fontSize: 13,
        color: "#777",
    },

    infoItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },

    infoLabel: {
        fontWeight: "bold",
        color: "#333",
    },

    infoValue: {
        color: "#666",
    },
});

export default GameExpansion;
