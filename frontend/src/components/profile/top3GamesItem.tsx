import { Pressable, StyleSheet, Text, View } from "react-native";

const Top3GameItem = ({game, pos}: any) => {

    return (
        <Pressable
            style={styles.container}
            // onPress={onPress}
        >
            <View style={styles.position}>
                <Text style={styles.positionText}>
                    {pos}
                </Text>
            </View>
      
            {game ? (
                <View style={styles.gameContainer}>
                    {game.primary_image_url ? (
                        <img
                            src={game.primary_image_url}
                            style={styles.image}
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text>No Image</Text>
                        </View>
                    )}

                    <View style={styles.gameInfo}>
                        <Text style={styles.gameTitle}>
                            {game.title}
                        </Text>
                    </View>
                </View>
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.addText}>
                        No game Added
                    </Text>
                </View>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 100,
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 12,
        padding: 12,
    },

    position: {
        width: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    positionText: {
        fontSize: 24,
        fontWeight: "bold",
    },

    gameContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 12,
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 8,
        objectFit: "cover",
    },

    imagePlaceholder: {
        width: 70,
        height: 70,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eee",
    },

    gameInfo: {
        flex: 1,
        marginLeft: 12,
    },

    gameTitle: {
        fontSize: 18,
        fontWeight: "600",
    },

    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 12,
    },

    addText: {
        fontSize: 16,
        fontWeight: "600",
    },
});

export default Top3GameItem