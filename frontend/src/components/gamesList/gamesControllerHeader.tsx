import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";

type GamesHeaderProps = {
    selectedTab: "collection" | "database" | "add";
    onSelectTab: (tab: "collection" | "database" | "add") => void;
};

const GamesControllerHeader = ({
    selectedTab,
    onSelectTab,
}: GamesHeaderProps) => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const handleSelect = (
        category: "collection" | "database" | "add"
    ) => {
        onSelectTab(category);
    };

    return (
        <View style={[styles.header, isMobile && styles.mobileHeader]}>
            <Pressable
                style={[
                    styles.tabButton,
                    isMobile && styles.mobileTabButton,
                    selectedTab === "collection" && styles.activeTab,
                ]}
                onPress={() => handleSelect("collection")}
            >
                <Text
                    style={[
                        styles.tabText,
                        selectedTab === "collection" && styles.activeTabText,
                    ]}
                >
                    My Collection
                </Text>
            </Pressable>

            <Pressable
                style={[
                    styles.tabButton,
                    isMobile && styles.mobileTabButton,
                    selectedTab === "database" && styles.activeTab,
                ]}
                onPress={() => handleSelect("database")}
            >
                <Text
                    style={[
                        styles.tabText,
                        selectedTab === "database" && styles.activeTabText,
                    ]}
                >
                    All Games
                </Text>
            </Pressable>

            <Pressable
                style={[
                    styles.tabButton,
                    isMobile && styles.mobileTabButton,
                    selectedTab === "add" && styles.activeTab,
                ]}
                onPress={() => handleSelect("add")}
            >
                <Text
                    style={[
                        styles.tabText,
                        selectedTab === "add" && styles.activeTabText,
                    ]}
                >
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

    mobileHeader: {
        flexWrap: "wrap",
    },

    tabButton: {
        flex: 1,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    mobileTabButton: {
        minWidth: "33.33%",
    },

    activeTab: {
        backgroundColor: "#4A90E2",
    },

    tabText: {
        fontWeight: "600",
        color: "#555",
        textAlign: "center",
    },

    activeTabText: {
        color: "#fff",
    },
});

export default GamesControllerHeader;
