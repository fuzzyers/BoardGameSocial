import { StyleSheet, Text, View } from "react-native";
import { ProfileData } from "@/types/apiDataTypes";

type ProfileGamesProps = {
    profile: ProfileData;
};

const ProfileGames = ({ profile }: ProfileGamesProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Games</Text>

            {profile.games.map((game) => (
                <View key={game.id} style={styles.game}>
                    <Text style={styles.gameTitle}>{game.title}</Text>
                </View>
            ))}
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
