import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Game } from "@/types/apiDataTypes";
import GamesCardExpanded from "./gamesCardExpanded";
import GamesCardHeader from "./gamesCardHeader";
import GamesCardInfo from "./gamesCardInfo";

type GamesCardProps = {
    game: Game;
    selectedTab: "collection" | "database" | "add" | "addtoevent" | "polls";
    eventId: number | null;
    group_id: number;
};

const GamesCard = ({ game, selectedTab, eventId, group_id }: GamesCardProps) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.card}>
            <GamesCardHeader game={game} expanded={expanded} setExpanded={setExpanded} />
            <GamesCardInfo game={game} />
            {expanded && <GamesCardExpanded game={game} selectedTab={selectedTab} eventId={eventId} group_id={group_id} />}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
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
