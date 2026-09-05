import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { BGGSearchResult } from "../../../services/bgg";
import BGGGameCard from "./BGGGameCard";
import ListGamesModal from "./ListGamesModal";

type BGGSearchResultsProps = {
    results: BGGSearchResult[];
};

const BGGSearchResults = ({ results }: BGGSearchResultsProps) => {
    const [showModal, setShowModal] = useState(false);
    const [expansion, setExpansion] = useState<any>(null);

    if (results.length === 0) {
        return null;
    }

    const handleExpansionSelected = (game: any) => {
        console.log("modal");
        setExpansion(game);
        setShowModal(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Search Results</Text>

            <FlatList
                data={results}
                keyExtractor={(item) => item.bgg_id}
                renderItem={({ item }) => <BGGGameCard game={item} onExpansionSelected={handleExpansionSelected} />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator
            />

            <ListGamesModal showModal={showModal} setShowModal={setShowModal} selectedTab="expansion" expansion={expansion} />
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
