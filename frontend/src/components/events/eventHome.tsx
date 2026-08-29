import { Pressable, StyleSheet, Text, View } from "react-native"
import { EventWithGames, Game } from "@/types/apiDataTypes";
import { getAllGames } from "@/services/games";
import { useState } from "react";
import GamesListModal from "../gamesList/gamesListModal";
import DeleteEventButton from "./deleteEventButton";

type EventHomeProps = {
    event: EventWithGames;
}

const EventHome = ({event}: EventHomeProps) => {
    const [games, setGames] = useState<Game[]>()
    const [addGames, setAddGames] = useState<boolean>(false)
    
    const getGames = async () => {
        const response = await getAllGames()
        console.log("evemts ", event)
        setGames(response)
        setAddGames(true)
    }

    return (
        <View>
            <Text style={styles.sectionTitle}>Games</Text>
            {event.games[0]?.id ? (
                event.games.map((game) => (
                    <View key={game.id} style={styles.gameCard}>
                        <Text style={styles.gameTitle}>{game.title}</Text>
                    </View>
                ))
            ):(
                <Text>No Games Currently Added</Text>
            )}

            <Pressable onPress={() => getGames()}>
                <Text>Add Games</Text>
            </Pressable>
            {addGames && games && (
                <GamesListModal
                    visible={addGames}
                    games={games ?? []}
                    eventId={event.id}
                    onClose={() => setAddGames(false)}
                />
            )}   

            <DeleteEventButton group_id={event.group_id} eventId={event.id}/> 
        </View>
    )
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12,
    },

    gameCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },

    gameTitle: {
        fontSize: 17,
        fontWeight: "600",
    },
        modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContent: {
        width: "90%",
        maxHeight: "80%",
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
});


export default EventHome;