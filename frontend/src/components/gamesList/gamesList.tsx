import { EventWithGames, Game } from "@/types/apiDataTypes";
import { FlatList, StyleSheet } from "react-native";
import GameCard from "./GamesCard/gamesCard";
import { selectedTab } from "@/types/gamesList";

type GamesListProps = selectedTab & {
    games: Game[];
    eventId?: number;
    group_id?: number;
    expansion?: Game;
    setEvent?: React.Dispatch<React.SetStateAction<EventWithGames | undefined>>;
    wishlist?: boolean;
    updateTop3Game?: any;
};

const GamesList = ({ games, selectedTab, eventId, group_id, expansion, setEvent, wishlist, updateTop3Game }: GamesListProps) => {
    return (
        <FlatList
            data={games}
            style={styles.list}
            contentContainerStyle={styles.content}
            keyExtractor={(game) => game.id.toString()}
            renderItem={({ item }) => (
                <GameCard
                    game={item}
                    selectedTab={selectedTab}
                    eventId={eventId}
                    group_id={group_id}
                    expansion={expansion}
                    setEvent={setEvent}
                    wishlist={wishlist}
                    updateTop3Game={updateTop3Game}
                />
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
