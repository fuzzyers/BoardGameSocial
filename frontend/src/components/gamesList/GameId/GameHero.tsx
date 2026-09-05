import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const GameHero = ({ game }: { game: any }) => {
    useEffect(() => {
        console.log("Game data in GameHero:", game);
    }, [game]);

    return (
        <View style={styles.heroContainer}>
            <Image source={{ uri: game.primary_image_url }} style={styles.heroImage} resizeMode="cover" />
            <View style={styles.heroOverlay}></View>
            <View style={styles.heroContent}>
                <Text style={styles.heroTitle}>{game.title}</Text>
                <Text style={styles.heroSubtitle}>{game.year_published}</Text>
                <Text style={styles.heroSubtitle}>Average Rating: {game.average_rating?.toFixed(1)}</Text>
                <Text style={styles.heroSubtitle}>Average Weight: {game.avg_weight?.toFixed(2)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    heroContainer: {
        alignItems: "center",
        marginBottom: 20,
    },

    heroImage: {
        width: 220,
        height: 270,
        borderRadius: 12,
    },

    heroOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: 12,
    },

    heroContent: {
        position: "absolute",
        bottom: 10,
        left: 10,
    },

    heroTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },

    heroSubtitle: {
        fontSize: 14,
        color: "#fff",
    },
});

export default GameHero;
