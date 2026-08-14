import { FlatList, StyleSheet, Text, View } from "react-native";
import { BGGSearchResult } from "../../../services/bgg";
import BGGGameCard from "./BGGGameCard";

type BGGSearchResultsProps = {
    results: BGGSearchResult[];
    onGameSelected?: (game: BGGSearchResult) => void;
};

const BGGSearchResults = ({ results, onGameSelected }: BGGSearchResultsProps) => {
    if (results.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Search Results</Text>

            <FlatList
                data={results}
                keyExtractor={(item) => item.bgg_id}
                renderItem={({ item }) => <BGGGameCard game={item}/>}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    heading: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333",
        marginBottom: 12,
    },

    separator: {
        height: 10,
    },
});

export default BGGSearchResults;
