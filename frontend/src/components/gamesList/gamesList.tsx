import { Game } from "@/types/apiDataTypes";
import { FlatList, StyleSheet, useWindowDimensions } from "react-native";
import GameCard from "./GamesCard/gamesCard";

type GamesListProps = {
    games: Game[];
    selectedTab: "collection" | "database" | "add" | "addtoevent" | "polls" | "expansion";
    eventId?: number;
    group_id?: number;
    expansion?: Game;
};

const GamesList = ({ games, selectedTab, eventId, group_id, expansion }: GamesListProps) => {
    const { width } = useWindowDimensions();

    const numColumns = width >= 600 ? 2 : 1;

    return (
        <FlatList
            data={games}
            style={styles.list}
            contentContainerStyle={styles.content}
            keyExtractor={(game) => game.id.toString()}
            renderItem={({ item }) => (
                <GameCard game={item} selectedTab={selectedTab} eventId={eventId} group_id={group_id} expansion={expansion} />
            )}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        minHeight: 0,
    },

    content: {
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
});

export default GamesList;
