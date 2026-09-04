import { Game } from "@/types/apiDataTypes";
import { Pressable, StyleSheet, Text, View } from "react-native";

type GamesCardHeaderProps = {
    game: Game;
    expanded: boolean;
    setExpanded: (value: boolean) => void;
};

const GamesCardHeader = ({ game, expanded, setExpanded }: GamesCardHeaderProps) => {
    return (
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
    );
};

const styles = StyleSheet.create({
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
});

export default GamesCardHeader;
