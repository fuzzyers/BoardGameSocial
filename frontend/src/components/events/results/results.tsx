import { View } from "react-native";
import ResultTable from "./resultsTable";
import { useEffect } from "react";

const Result = ({ event, selectedTab, setEvent }: any) => {
    return (
        <View>
            {event.games.map((game: any) => (
                <ResultTable game={game} members={event.members} event_id={event.id} setEvent={setEvent} />
            ))}
        </View>
    );
};

export default Result;
