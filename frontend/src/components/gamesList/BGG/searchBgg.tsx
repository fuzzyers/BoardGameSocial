import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { BGGSearchResult, searchBGGGame } from "../../../services/bgg";
import BGGSearchInput from "./BGGSearchInput";
import BGGSearchResults from "./BGGSearchResults";

type SearchGameProps = {
    onGameSelected?: (game: BGGSearchResult) => void;
};

const SearchBGG = ({ onGameSelected }: SearchGameProps) => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<BGGSearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

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

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Game</Text>

            <Text style={styles.description}>Search BoardGameGeek for a game to add to your database.</Text>

            <BGGSearchInput value={search} onChangeText={setSearch} onSearch={handleSearch} loading={loading} />

            {loading && <ActivityIndicator style={styles.loading} />}

            {message !== "" && <Text style={styles.message}>{message}</Text>}

            <BGGSearchResults results={results} onGameSelected={onGameSelected} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        maxWidth: 700,
        alignSelf: "center",
        padding: 20,
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

    loading: {
        marginVertical: 10,
    },

    message: {
        color: "#666",
        fontSize: 14,
        marginBottom: 15,
    },
});

export default SearchBGG;
