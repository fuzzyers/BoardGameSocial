import { Game } from "@/types/apiDataTypes";
import { StyleSheet, Text, View } from "react-native";
import GameActionButton from "./gameActionButton";
import useGameAction from "@/hooks/useGameAction";

type GamesCardHeaderProps = {
    game: Game;
    selectedTab: "collection" | "database" | "add" | "addtoevent" | "polls" | "expansion";
    eventId?: number;
    group_id?: number;
    expansion?: Game;
};

const GamesCardHeader = ({ game, selectedTab, eventId, group_id, expansion }: GamesCardHeaderProps) => {
    const { action, loading, status, button } = useGameAction({
        game,
        selectedTab,
        eventId,
        group_id,
        expansion,
    });

    return (
        <View style={styles.header}>
            <View style={styles.titleContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.title} numberOfLines={1}>
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

            <View style={styles.actionContainer}>
                {button && (
                    <GameActionButton
                        title={button.title}
                        loadingTitle={button.loadingTitle}
                        successTitle={button.successTitle}
                        errorTitle={button.errorTitle}
                        adding={loading}
                        status={status}
                        onPress={action}
                        variant={button.variant}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
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

    actionContainer: {
        marginLeft: 10,
        flexShrink: 0,
    },
});

export default GamesCardHeader;
