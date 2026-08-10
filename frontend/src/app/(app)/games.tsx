import GamesContainer from "@/components/gamesList/gamesContainer";
import { StyleSheet, View } from "react-native";

const Games = () => {
    return (
        <View style={styles.container}>
            <GamesContainer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Games;