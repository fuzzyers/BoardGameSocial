import { useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from "react-native";
import { BGGSearchResult, searchBGGGame } from "@/services/bgg";

type SearchGameProps = {
    onGameSelected?: (game: BGGSearchResult) => void;
};

const SearchBGG = ({ onGameSelected }: SearchGameProps) => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<BGGSearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const { width } = useWindowDimensions();
    const isMobile = width < 600;

    const handleSearch = async () => {
        if (loading) return;

        const trimmedSearch = search.trim();

        if (!trimmedSearch) {
            setMessage("Please enter a game name.");
            setResults([]);
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const games = await searchBGGGame(trimmedSearch);

            setResults(games);

            if (games.length === 0) {
                setMessage("No games found.");
            }
        } catch (error) {
            console.error("BGG search error:", error);

            setResults([]);
            setMessage("Failed to search BoardGameGeek. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectGame = (game: BGGSearchResult) => {
        onGameSelected?.(game);
    };

    const renderGame = ({ item }: { item: BGGSearchResult }) => {
        return (
            <View style={styles.gameCard}>
                <View style={styles.gameInfo}>
                    <Text style={styles.gameTitle}>{item.title}</Text>

                    {item.year_published && <Text style={styles.gameYear}>{item.year_published}</Text>}
                </View>

                <Pressable style={styles.addButton} onPress={() => handleSelectGame(item)}>
                    <Text style={styles.addButtonText}>Add Game</Text>
                </Pressable>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={[styles.content, isMobile && styles.mobileContent]}>
                <Text style={styles.heading}>Add Game</Text>

                <Text style={styles.description}>Search BoardGameGeek for a game to add to your database.</Text>

                <View style={[styles.searchRow, isMobile && styles.mobileSearchRow]}>
                    <TextInput
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Search for a game..."
                        editable={!loading}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />

                    <Pressable
                        style={[styles.searchButton, loading && styles.disabledButton, isMobile && styles.mobileSearchButton]}
                        onPress={handleSearch}
                        disabled={loading}
                    >
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.searchButtonText}>Search</Text>}
                    </Pressable>
                </View>

                {message !== "" && <Text style={styles.message}>{message}</Text>}

                {results.length > 0 && (
                    <View style={styles.resultsContainer}>
                        <Text style={styles.resultsHeading}>Search Results</Text>

                        <FlatList
                            data={results}
                            keyExtractor={(item) => item.bgg_id}
                            renderItem={renderGame}
                            scrollEnabled={false}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        width: "100%",
        maxWidth: 700,
        alignSelf: "center",
        padding: 20,
    },

    mobileContent: {
        maxWidth: undefined,
    },

    heading: {
        fontSize: 24,
        fontWeight: "700",
        color: "#222",
        marginBottom: 6,
    },

    description: {
        fontSize: 14,
        color: "#666",
        marginBottom: 20,
    },

    searchRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 20,
    },

    mobileSearchRow: {
        flexDirection: "column",
        gap: 0,
    },

    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        backgroundColor: "#fff",
        marginBottom: 0,
    },

    searchButton: {
        backgroundColor: "#4A90E2",
        paddingHorizontal: 22,
        paddingVertical: 11,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 100,
    },

    mobileSearchButton: {
        marginTop: 10,
        width: "100%",
    },

    disabledButton: {
        opacity: 0.6,
    },

    searchButtonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },

    message: {
        color: "#666",
        fontSize: 14,
        marginBottom: 15,
    },

    resultsContainer: {
        marginTop: 5,
    },

    resultsHeading: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333",
        marginBottom: 12,
    },

    gameCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 8,
        padding: 14,
    },

    gameInfo: {
        flex: 1,
        paddingRight: 15,
    },

    gameTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
    },

    gameYear: {
        fontSize: 13,
        color: "#777",
        marginTop: 4,
    },

    addButton: {
        backgroundColor: "#4A90E2",
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 6,
    },

    addButtonText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
    },

    separator: {
        height: 10,
    },
});

export default SearchBGG;
