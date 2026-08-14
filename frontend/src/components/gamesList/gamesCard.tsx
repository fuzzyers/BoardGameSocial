import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Game } from "@/types/apiDataTypes";
import { addToCollection } from "@/services/games";

type GamesCardProps = {
    game: Game;
    selectedTab: "collection" | "database" | "add";
};

const GamesCard = ({ game, selectedTab }: GamesCardProps) => {
    const [expanded, setExpanded] = useState(false);
    const [adding, setAdding] = useState(false);
    const [addStatus, setAddStatus] = useState<"success" | "error" | null>(null);

    const handleAddToCollection = async () => {
        try {
            setAdding(true);
            setAddStatus(null);

            await addToCollection(game.id);

            setAddStatus("success");
        } catch (error) {
            console.error("Failed to add game to collection:", error);
            setAddStatus("error");
        } finally {
            setAdding(false);
        }
    };

    return (
        <View style={styles.card}>
            <Pressable style={styles.header} onPress={() => setExpanded(!expanded)}>
                <View style={styles.titleContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title} numberOfLines={expanded ? undefined : 1}>
                            {game.title}
                        </Text>

                        {game.review_status === "approved" && (
                            <View style={[styles.reviewTag, styles.verifiedTag]}>
                                <Text style={[styles.reviewText, styles.verifiedText]}>✓ Verified</Text>
                            </View>
                        )}

                        {game.review_status === "pending" && (
                            <View style={[styles.reviewTag, styles.pendingTag]}>
                                <Text style={[styles.reviewText, styles.pendingText]}>⚠ Not Verified</Text>
                            </View>
                        )}

                        {game.review_status === "rejected" && (
                            <View style={[styles.reviewTag, styles.rejectedTag]}>
                                <Text style={[styles.reviewText, styles.rejectedText]}>✕ Rejected</Text>
                            </View>
                        )}
                    </View>

                    {game.year_published && <Text style={styles.year}>{game.year_published}</Text>}
                </View>

                <Text style={styles.arrow}>{expanded ? "▲" : "▼"}</Text>
            </Pressable>

            <View style={styles.quickInfo}>
                <Text style={styles.info}>
                    👥 {game.min_players}-{game.max_players}
                </Text>

                <Text style={styles.info}>
                    ⏱ {game.min_play_time}-{game.max_play_time} min
                </Text>

                {game.min_age && <Text style={styles.info}>{game.min_age}+</Text>}
            </View>

            {expanded && (
                <View style={styles.expandedContent}>
                    {game.description && <Text style={styles.description}>{game.description}</Text>}

                    {game.bgg_id && <Text style={styles.bgg}>BGG ID: {game.bgg_id}</Text>}

                    {selectedTab === "database" && (
                        <>
                            <Pressable
                                style={[styles.collectionButton, adding && styles.collectionButtonDisabled]}
                                onPress={handleAddToCollection}
                                disabled={adding}
                            >
                                <Text style={styles.collectionButtonText}>
                                    {adding
                                        ? "Adding..."
                                        : addStatus === "success"
                                          ? "✓ Added to Collection"
                                          : addStatus === "error"
                                            ? "✕ Failed — Try Again"
                                            : "Add to Collection"}
                                </Text>
                            </Pressable>

                            {addStatus === "success" && <Text style={styles.successMessage}>✓ Added to your collection</Text>}

                            {addStatus === "error" && (
                                <Text style={styles.errorMessage}>✕ Could not add this game. Please try again.</Text>
                            )}
                        </>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 12,
        marginVertical: 6,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e5e5e5",
        overflow: "hidden",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },

    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 14,
    },

    titleContainer: {
        flex: 1,
        minWidth: 0,
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
    },

    title: {
        flexShrink: 1,
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
    },

    reviewTag: {
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 6,
    },

    reviewText: {
        fontSize: 11,
        fontWeight: "700",
    },

    verifiedTag: {
        backgroundColor: "#e8f5e9",
    },

    verifiedText: {
        color: "#2e7d32",
    },

    pendingTag: {
        backgroundColor: "#fff8e1",
    },

    pendingText: {
        color: "#f57c00",
    },

    rejectedTag: {
        backgroundColor: "#ffebee",
    },

    rejectedText: {
        color: "#c62828",
    },

    year: {
        marginTop: 3,
        fontSize: 12,
        color: "#777",
    },

    arrow: {
        marginLeft: 8,
        marginTop: 2,
        fontSize: 14,
        color: "#777",
    },

    quickInfo: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        paddingHorizontal: 14,
        paddingBottom: 12,
    },

    info: {
        fontSize: 12,
        color: "#555",
        fontWeight: "500",
    },

    expandedContent: {
        borderTopWidth: 1,
        borderTopColor: "#eee",
        padding: 14,
    },

    description: {
        fontSize: 14,
        lineHeight: 20,
        color: "#555",
        marginBottom: 12,
    },

    bgg: {
        fontSize: 12,
        color: "#888",
        marginBottom: 12,
    },

    collectionButton: {
        backgroundColor: "#4A90E2",
        paddingVertical: 11,
        borderRadius: 8,
        alignItems: "center",
    },

    collectionButtonDisabled: {
        opacity: 0.6,
    },

    collectionButtonText: {
        color: "#fff",
        fontWeight: "700",
    },

    successMessage: {
        marginTop: 8,
        color: "#2e7d32",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center",
    },

    errorMessage: {
        marginTop: 8,
        color: "#c62828",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center",
    },
});

export default GamesCard;
