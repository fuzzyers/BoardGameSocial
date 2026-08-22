import { Game } from "@/types/apiDataTypes";
import { FlatList } from "react-native";
import GameCard from "./GamesCard/gamesCard";

type GamesListProps = {
    games: Game[];
    selectedTab: "collection" | "database" | "add" | "addtoevent";
    eventId: number | null;
};

const GamesList = ({ games, selectedTab, eventId }: GamesListProps) => {
    return (
        <FlatList
            data={games}
            keyExtractor={(game) => game.id.toString()}
            renderItem={({ item }) => <GameCard game={item} selectedTab={selectedTab} eventId={eventId}/>}
            contentContainerStyle={{
                paddingVertical: 8,
            }}
        />
    );
};

export default GamesList;
