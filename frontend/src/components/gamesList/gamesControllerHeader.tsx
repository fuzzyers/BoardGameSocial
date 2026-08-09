import { getAllGames } from "@/services/games";
import { Game } from "@/types/apiDataTypes";
import { Pressable, StyleSheet, Text, View } from "react-native";

type GamesHeaderProps = {
    selectedTab: "collection" | "database" | "add";
    onSelectTab: (tab: "collection" | "database" | "add") => void;
};

const GamesControllerHeader = ({selectedTab, onSelectTab}: GamesHeaderProps) => {

    const handleSelect = async (category: "collection" | "database" | "add") => {
        onSelectTab(category)
    }

    return (
        <View style={styles.header}>
            <Pressable
                style={[styles.tabButton, selectedTab === "collection" && styles.activeTab]} 
                onPress={() => handleSelect("collection")}
            >
                <Text style={[styles.tabText, selectedTab === "collection" && styles.activeTabText]}>
                    My Collection
                </Text>
            </Pressable>

            <Pressable
                style={[styles.tabButton, selectedTab === "database" && styles.activeTab]}
                onPress={() => handleSelect("database")}
            >
                <Text style={[styles.tabText, selectedTab === "database" && styles.activeTabText]}>
                    All Games
                </Text>
            </Pressable>

            <Pressable
                style={[styles.tabButton, selectedTab === "add" && styles.activeTab]}
                onPress={() => handleSelect("add")}
            >
                <Text style={[styles.tabText, selectedTab === "add" && styles.activeTabText]}>
                    Add Game
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        backgroundColor: "#f4f4f4",
    },

    tabButton: {
        flex: 1,
        paddingVertical: 14,
        alignItems: "center",
    },

    activeTab: {
        backgroundColor: "#4A90E2",
    },

    tabText: {
        fontWeight: "600",
        color: "#555",
    },

    activeTabText: {
        color: "#fff",
    },
});

export default GamesControllerHeader;