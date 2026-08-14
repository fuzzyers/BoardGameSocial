import { Pressable, StyleSheet, Text, View } from "react-native";
import { BGGSearchResult } from "../../../services/bgg";

type BGGGameCardProps = {
    game: BGGSearchResult;
    onPress: () => void;
};

const BGGGameCard = ({ game, onPress }: BGGGameCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.title}>{game.title}</Text>

                {game.year_published && <Text style={styles.year}>{game.year_published}</Text>}
            </View>

            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Add Game</Text>
            </Pressable>
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
