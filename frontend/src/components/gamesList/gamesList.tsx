import { Game } from "@/types/apiDataTypes";
import { FlatList, StyleSheet, useWindowDimensions } from "react-native";
import GameCard from "./GamesCard/gamesCard";

type GamesListProps = {
    games: Game[];
    selectedTab: "collection" | "database" | "add" | "addtoevent" | "polls";
    eventId: number | null;
};

const GamesList = ({ games, selectedTab, eventId }: GamesListProps) => {
    const { width } = useWindowDimensions();

    const numColumns = width >= 600 ? 2 : 1;

    return (
        <FlatList
            data={games}
            keyExtractor={(game) => game.id.toString()}
            renderItem={({ item }) => <GameCard game={item} selectedTab={selectedTab} eventId={eventId}/>}
            // numColumns={numColumns}
            key={numColumns}
            // columnWrapperStyle={numColumns === 2 ? styles.row : undefined}
            contentContainerStyle={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        paddingVertical: 8,
        paddingHorizontal: 8,
    },

    row: {
        justifyContent: "space-between",
        gap: 8,
        marginBottom: 8,
    },
});

export default GamesList;
