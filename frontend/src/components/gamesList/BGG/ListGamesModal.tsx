import {
    ActivityIndicator,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import GamesList from "../gamesList";
import { useEffect, useState } from "react";
import { getAllGames } from "@/services/games";
import { Game } from "@/types/apiDataTypes";

type ListGamesModalProps = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
};

const ListGamesModal = ({
    showModal,
    setShowModal,
}: ListGamesModalProps) => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!showModal) return;

        const getData = async () => {
            setLoading(true);

            try {
                const response = await getAllGames();
                setGames(response);
            } catch (error) {
                console.error("Failed to get games:", error);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [showModal]);

    return (
        <Modal
            visible={showModal}
            animationType="fade"
            transparent
            onRequestClose={() => setShowModal(false)}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Select Base Game
                        </Text>

                        <Pressable
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={styles.close}>✕</Text>
                        </Pressable>
                    </View>

                    <View style={styles.content}>
                        {loading ? (
                            <ActivityIndicator size="large" />
                        ) : (
                            <GamesList
                                selectedTab="database"
                                games={games}
                            />
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    modal: {
        width: "100%",
        maxWidth: 1000,
        height: "80%",
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
    },

    header: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    title: {
        fontSize: 20,
        fontWeight: "600",
    },

    close: {
        fontSize: 20,
        color: "#666",
    },

    content: {
        flex: 1,
        minHeight: 0,
    },
});

export default ListGamesModal;