import { Game } from "@/types/apiDataTypes";
import { StyleSheet, Text, View } from "react-native";

type GamesCardInfoProps = {
    game: Game;
};

const GamesCardInfo = ({ game }: GamesCardInfoProps) => {
    return (
        <View style={styles.quickInfo}>
            <Text style={styles.info}>
                👥 {game.min_players}-{game.max_players}
            </Text>

            <Text style={styles.info}>
                ⏱ {game.min_play_time}-{game.max_play_time} min
            </Text>

            {game.min_age && <Text style={styles.info}>{game.min_age}+</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default GamesCardInfo;
