import { View } from "react-native";
import ResultTable from "./resultsTable";
import { useEffect } from "react";

const fakeGames = [
    {
        id: 1,
        title: "Catan",
        results: [
            {
                user_id: 1,
                name: "Jack",
                username: "fuzzyers",
                placement: 1,
                score: 10,
                leaderboard_points: 10,
            },
            {
                user_id: 2,
                name: "Dave",
                username: "fuzz",
                placement: 2,
                score: 7,
                leaderboard_points: 6,
            },
            {
                user_id: 3,
                name: "Ham",
                username: "ham",
                placement: 0,
                score: 0,
                leaderboard_points: 0,
            },
        ],
    },
    {
        id: 2,
        title: "Wingspan",
        results: [
            {
                user_id: 2,
                name: "Dave",
                username: "fuzz",
                placement: 1,
                score: 82,
                leaderboard_points: 10,
            },
            {
                user_id: 1,
                name: "Jack",
                username: "fuzzyers",
                placement: 2,
                score: 71,
                leaderboard_points: 6,
            },
        ],
    },
    {
        id: 3,
        title: "Brass: Birmingham",
        results: [
            {
                user_id: 3,
                name: "Ham",
                username: "ham",
                placement: 1,
                score: 146,
                leaderboard_points: 10,
            },
        ],
    },
];

const Result = ({ event, selectedTab }: any) => {
    useEffect(() => {
        console.log(event)
    },[])
    return (
        <View>
            {event.games.map((game:any) => (
                <ResultTable game={game} members={event.members} event_id={event.id}/>
            ))}
        </View>
    );
};

export default Result;
