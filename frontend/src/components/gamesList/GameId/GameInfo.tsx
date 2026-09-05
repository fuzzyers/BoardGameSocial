import { Text, View, StyleSheet } from "react-native";

const GameInfo = ({ game }: { game: any }) => {
    return (
        <View style={styles.container}>
            <View style={styles.infoCard}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Year Published:</Text>
                    <Text style={styles.infoValue}>{game.year_published}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoValue}>{game.description}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },

    infoCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    infoItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },

    infoLabel: {
        fontWeight: "bold",
        color: "#333",
    },

    infoValue: {
        color: "#666",
    },
});

export default GameInfo;
