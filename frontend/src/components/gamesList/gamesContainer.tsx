import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, useWindowDimensions, View } from "react-native";
import GamesControllerHeader from "./gamesControllerHeader";
import GamesList from "./gamesList";
import { Game } from "@/types/apiDataTypes";
import { getAllCollectionGames, getAllGames, getAllWishListGames } from "@/services/games";
import SearchBGG from "./BGG/searchBgg";

const GamesContainer = () => {
    const [selectedTab, setSelectedTab] = useState<"collection" | "database" | "add" | "wishlist">("collection");
    const [loading, setLoading] = useState<boolean>(true)
    const [games, setGames] = useState<Game[]>([]);

    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const onSelect = async () => {
        try{
            setLoading(true)
            let data: Game[] = [];

            if (selectedTab === "collection") {
                data = await getAllCollectionGames();
            }

            if (selectedTab === "database") {
                data = await getAllGames();
            }

            if (selectedTab === "wishlist") {
                data = await getAllWishListGames()
            }

            if (selectedTab === "add") {
                setLoading(false)
                return;
            }
            setGames(data);
        }catch (error) {

        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        onSelect();
    }, [selectedTab]);

    return (
        <View style={[styles.container, isMobile && styles.mobileContainer]}>
            <GamesControllerHeader selectedTab={selectedTab} onSelectTab={setSelectedTab} />
            {loading && <ActivityIndicator/>}
            <View style={styles.content}>
                {selectedTab === "collection" && <GamesList games={games} selectedTab={selectedTab} />}

                {selectedTab === "wishlist" && <GamesList games={games} selectedTab={selectedTab} />}

                {selectedTab === "database" && <GamesList games={games} selectedTab={selectedTab} wishlist={true}/>}

                {selectedTab === "add" && <SearchBGG />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
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
