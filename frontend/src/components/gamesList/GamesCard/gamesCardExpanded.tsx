import { addGameToEvent } from "@/services/event";
import { addToCollection } from "@/services/games";
import { Game } from "@/types/apiDataTypes";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native"

type GamesCardExpandedProps = {
    game: Game;
    selectedTab: "collection" | "database" | "add" | "addtoevent";
    eventId: number | null;
};

const GamesCardExpanded = ({game, selectedTab, eventId}: GamesCardExpandedProps) => {
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

        const handleAddToEvent = async () => {
        try {
            setAdding(true);
            setAddStatus(null);

            if (eventId === null) return
            
            await addGameToEvent(game.id, eventId);

            setAddStatus("success");
        } catch (error) {
            console.error("Failed to add game to collection:", error);
            setAddStatus("error");
        } finally {
            setAdding(false);
        }
    };

    return (
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

            {selectedTab === "addtoevent" && (
                <>
                    <Pressable
                        style={[styles.collectionButton, adding && styles.collectionButtonDisabled]}
                        onPress={handleAddToEvent}
                        disabled={adding}
                    >
                        <Text style={styles.collectionButtonText}>
                            {adding
                                ? "Adding..."
                                : addStatus === "success"
                                    ? "✓ Added to Event"
                                    : addStatus === "error"
                                    ? "✕ Failed — Try Again"
                                    : "Add to Event"}
                        </Text>
                    </Pressable>

                    {addStatus === "success" && <Text style={styles.successMessage}>✓ Added to your event</Text>}

                    {addStatus === "error" && (
                        <Text style={styles.errorMessage}>✕ Could not add this game. Please try again.</Text>
                    )}
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
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

export default GamesCardExpanded