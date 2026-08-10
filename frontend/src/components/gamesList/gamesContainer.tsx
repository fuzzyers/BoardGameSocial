import { useEffect, useState } from "react";
import {
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import GamesControllerHeader from "./gamesControllerHeader";
import GamesList from "./gamesList";
import { Game } from "@/types/apiDataTypes";
import {
    getAllCollectionGames,
    getAllGames,
} from "@/services/games";
import AddGameForm from "./addGamesForm";

const GamesContainer = () => {
    const [selectedTab, setSelectedTab] = useState<
        "collection" | "database" | "add"
    >("collection");

    const [games, setGames] = useState<Game[]>([]);

    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const onSelect = async () => {
        let data: Game[] = [];

        if (selectedTab === "collection") {
            data = await getAllCollectionGames();
        }

        if (selectedTab === "database") {
            data = await getAllGames();
        }

        if (selectedTab === "add") return;

        setGames(data);
    };

    useEffect(() => {
        onSelect();
    }, [selectedTab]);

    return (
        <View
            style={[
                styles.container,
                isMobile && styles.mobileContainer,
            ]}
        >
            <GamesControllerHeader
                selectedTab={selectedTab}
                onSelectTab={setSelectedTab}
            />

            <View style={styles.content}>
                {selectedTab === "collection" && (
                    <GamesList
                        games={games}
                        selectedTab={selectedTab}
                    />
                )}

                {selectedTab === "database" && (
                    <GamesList
                        games={games}
                        selectedTab={selectedTab}
                    />
                )}

                {selectedTab === "add" && (
                    <AddGameForm />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        maxWidth: 1200,
        alignSelf: "center",

        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
        minHeight: 0,
    },

    mobileContainer: {
        borderRadius: 0,
        shadowOpacity: 0,
        elevation: 0,
    },

    content: {
        flex: 1,
    },
});

export default GamesContainer;
