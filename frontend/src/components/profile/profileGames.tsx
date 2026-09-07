import { StyleSheet, Text, View } from "react-native";
import { Game, ProfileData } from "@/types/apiDataTypes";
import GamesListModal from "../gamesList/gamesListModal";
import { useState } from "react";
import Button from "../generalComponents/Button";
import { getAllCollectionGames } from "@/services/games";
import Top3Game from "./top3games";

type ProfileGamesProps = {
    profile: ProfileData;
};

const ProfileGames = ({ profile }: ProfileGamesProps) => {
    const [gamesListVisible, setGamesListVisible] = useState(false)
    const [games, setGames] = useState<Game[]>()
    const [loading, setLoading] = useState<boolean>(false)

    const getGames = async () => {
        try {
            setLoading(true)
            const response = await getAllCollectionGames()

            setGames(response)

            setGamesListVisible(true)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Top 3 Games (Page Needs Refreshed to see Top3 updates will fix soon pinky promise)</Text>

            <Top3Game
                top3Games={profile.top3_games}
            />

            <Button
                title={"Edit Top 3 Games"}
                disabled={loading}
                onPress={() => getGames()}
                variant="outline"
            />

            {games && (
                <GamesListModal 
                    visible={gamesListVisible}
                    games={games}
                    onClose={() => setGamesListVisible(false)}
                    selectedTab="top3"
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
    },

    game: {
        padding: 15,
        marginBottom: 8,
        borderRadius: 8,
        backgroundColor: "#eee",
    },

    gameTitle: {
        fontSize: 16,
        fontWeight: "500",
    },
});

export default ProfileGames;
