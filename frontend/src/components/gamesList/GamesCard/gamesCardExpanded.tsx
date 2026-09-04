import { addGameToEvent, addGameToEventPoll } from "@/services/event";
import { addToCollection, removeFromCollection } from "@/services/games";
import { Game } from "@/types/apiDataTypes";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import GameActionButton from "./gameActionButton";

type GamesCardExpandedProps = {
    game: Game;
    selectedTab: "collection" | "database" | "add" | "addtoevent" | "polls";
    eventId: number | null;
    group_id: number;
};

const GamesCardExpanded = ({ game, selectedTab, eventId, group_id }: GamesCardExpandedProps) => {
    const [adding, setAdding] = useState(false);
    const [addStatus, setAddStatus] = useState<"success" | "error" | null>(null);

    const handleAction = async (action: () => Promise<void>) => {
        try {
            setAdding(true);
            setAddStatus(null);

            await action();

            setAddStatus("success");
        } catch (error) {
            console.error(error);
            setAddStatus("error");
        } finally {
            setAdding(false);
        }
    };

    const handleAddToCollection = () => {
        return handleAction(async () => {
            await addToCollection(game.id);
        });
    };

    const handleRemoveFromCollection = () => {
        return handleAction(async () => {
            await removeFromCollection(game.id);
        });
    };

    const handleAddToEvent = () => {
        if (eventId === null) return;

        return handleAction(async () => {
            await addGameToEvent(game.id, eventId, group_id);
        });
    };

    // eventId is actually the pollId
    const handleAddToEventPoll = () => {
        if (eventId === null) return;

        return handleAction(async () => {
            await addGameToEventPoll(game.id, eventId);
        });
    };

    return (
        <View style={styles.expandedContent}>
            {game.description && <Text style={styles.description}>{game.description}</Text>}

            {game.bgg_id && <Text style={styles.bgg}>BGG ID: {game.bgg_id}</Text>}

            {selectedTab === "database" && (
                <GameActionButton
                    title="Add to Collection"
                    loadingTitle="Adding..."
                    successTitle="✓ Added to Collection"
                    errorTitle="✕ Failed — Try Again"
                    adding={adding}
                    status={addStatus}
                    onPress={handleAddToCollection}
                />
            )}

            {selectedTab === "collection" && (
                <GameActionButton
                    title="Remove from Collection"
                    loadingTitle="Removing..."
                    successTitle="✓ Removed from Collection"
                    errorTitle="✕ Failed — Try Again"
                    adding={adding}
                    status={addStatus}
                    onPress={handleRemoveFromCollection}
                    variant="danger"
                />
            )}

            {selectedTab === "addtoevent" && (
                <GameActionButton
                    title="Add to Event"
                    loadingTitle="Adding..."
                    successTitle="✓ Added to Event"
                    errorTitle="✕ Failed — Try Again"
                    adding={adding}
                    status={addStatus}
                    onPress={handleAddToEvent}
                />
            )}

            {selectedTab === "polls" && (
                <GameActionButton
                    title="Add to Event Poll"
                    loadingTitle="Adding..."
                    successTitle="✓ Added to Event Poll"
                    errorTitle="✕ Failed — Try Again"
                    adding={adding}
                    status={addStatus}
                    onPress={handleAddToEventPoll}
                />
            )}

            {addStatus === "success" && <Text style={styles.successMessage}>✓ Action completed successfully</Text>}

            {addStatus === "error" && (
                <Text style={styles.errorMessage}>✕ Could not complete this action. Please try again.</Text>
            )}
        </View>
    );
};

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

export default GamesCardExpanded;
