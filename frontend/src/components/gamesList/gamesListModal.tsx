import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import GamesList from "../gamesList/gamesList";
import { EventWithGames, Game } from "@/types/apiDataTypes";

type GamesListModalProps = {
    visible: boolean;
    games: Game[];
    eventId?: number;
    onClose: () => void;
    selectedTab: "collection" | "database" | "add" | "addtoevent" | "polls" | "expansion" | "top3";
    group_id?: number;
    setEvent?: React.Dispatch<React.SetStateAction<EventWithGames | undefined>>;
};

const GamesListModal = ({ visible, games, onClose, eventId, selectedTab, group_id, setEvent }: GamesListModalProps) => {
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Add Games</Text>

                        <Pressable onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>✕</Text>
                        </Pressable>
                    </View>

                    <View style={styles.listContainer}>
                        <GamesList
                            games={games}
                            selectedTab={selectedTab}
                            eventId={eventId}
                            group_id={group_id}
                            setEvent={setEvent}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContent: {
        width: "90%",
        height: "80%",
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
    },

    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },

    closeButton: {
        padding: 8,
    },

    closeButtonText: {
        fontSize: 20,
        fontWeight: "bold",
    },

    listContainer: {
        flex: 1,
    },
});

export default GamesListModal;
