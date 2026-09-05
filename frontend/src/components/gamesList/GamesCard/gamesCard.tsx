import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { Game } from "@/types/apiDataTypes";
import GamesCardHeader from "./gamesCardHeader";
import GamesCardInfo from "./gamesCardInfo";

type GamesCardProps = {
    game: Game;
    selectedTab: "collection" | "database" | "add" | "addtoevent" | "polls" | "expansion";
    eventId?: number;
    group_id?: number;
    expansion?: Game;
};

const GamesCard = ({ game, selectedTab, eventId, group_id, expansion }: GamesCardProps) => {
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: "/(app)/games/[gameid]",
            params: {
                gameid: game.id.toString(),
            },
        });
    };

    return (
        <Pressable style={styles.card} onPress={handlePress}>
            <GamesCardHeader game={game} selectedTab={selectedTab} expansion={expansion} eventId={eventId} group_id={group_id} />
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
