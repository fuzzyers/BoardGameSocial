import { Game } from "@/types/apiDataTypes";
import { FlatList } from "react-native";
import GameCard from "./gamesCard";

type GamesListProps = {
    games: Game[];
    selectedTab: "collection" | "database" | "add";
};

const GamesList = ({ games, selectedTab }: GamesListProps) => {
    return (
        <FlatList
            data={games}
            keyExtractor={(game) => game.id.toString()}
            renderItem={({ item }) => (
                <GameCard game={item} selectedTab={selectedTab} />
            )}
        />
    );
};

export default GamesList