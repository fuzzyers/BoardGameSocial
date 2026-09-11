import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { EventWithGames, Game } from "@/types/apiDataTypes";
import GamesCardHeader from "./gamesCardHeader";
import GamesCardInfo from "./gamesCardInfo";
import { selectedTab } from "@/types/gamesList";

type GamesCardProps = selectedTab & {
    game: Game;
    eventId?: number;
    group_id?: number;
    expansion?: Game;
    setEvent?: React.Dispatch<React.SetStateAction<EventWithGames | undefined>>;
    wishlist?: boolean;
};

const GamesCard = ({ game, selectedTab, eventId, group_id, expansion, setEvent, wishlist }: GamesCardProps) => {
    const router = useRouter();

    const handlePress = () => {
        if (selectedTab === "top3") return
        router.push({
            pathname: "/(app)/games/[gameid]",
            params: {
                gameid: game.id.toString(),
            },
        });
    };

    return (
        <Pressable style={styles.card} onPress={handlePress}>
            <GamesCardHeader
                game={game}
                selectedTab={selectedTab}
                expansion={expansion}
                eventId={eventId}
                group_id={group_id}
                setEvent={setEvent}
                wishlist={wishlist}
            />

            <GamesCardInfo game={game} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 4,
        marginVertical: 6,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e5e5e5",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
});

export default GamesCard;
