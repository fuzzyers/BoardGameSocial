import EventIdHeader from "@/components/events/eventIdHeader";
import GamesList from "@/components/gamesList/gamesList";
import { getEventById } from "@/services/event";
import { getAllGames } from "@/services/games";
import { EventWithGames, Game } from "@/types/apiDataTypes";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

const EventPage = () => {
    const { eventId } = useLocalSearchParams();
    const [event, setEvent] = useState<EventWithGames>()
    const [games, setGames] = useState<Game[]>()
    const [addGames, setAddGames] = useState<boolean>(false)
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const getData = async () => {
                try {
                    setLoading(true)

                    const response = await getEventById(eventId)
                    setEvent(response)
                    console.log("Singular event: ", response)
                } catch (error) {

                } finally {
                    setLoading(false)
                }
            }

            if (eventId){
                getData()
            }

        }, [eventId])
    )

    const getGames = async () => {
        const response = await getAllGames()

        setGames(response)
        setAddGames(true)
    }

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Loading event...</Text>
            </View>
        );
    }
    
    if (!event) {
        return (
            <View style={styles.center}>
                <Text>Event not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <EventIdHeader event={event}/>
            <Text style={styles.sectionTitle}>Games</Text>

            {event.games[0].id ? (
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
            {addGames && games && <GamesList games={games} selectedTab={"addtoevent"} eventId={event.id}/>}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },

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
});

export default EventPage;