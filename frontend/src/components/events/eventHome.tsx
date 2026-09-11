import { StyleSheet, Text, View } from "react-native";
import { EventWithGames, Game } from "@/types/apiDataTypes";
import { getAllGames } from "@/services/games";
import { useEffect, useState } from "react";
import GamesListModal from "../gamesList/gamesListModal";
import DeleteEventButton from "./deleteEventButton";
import Button from "../generalComponents/Button";
import { removeGameFromEvent } from "@/services/event";

type EventHomeProps = {
    event: EventWithGames;
    selectedTab: "collection" | "database" | "add" | "addtoevent" | "polls";
    setEvent: React.Dispatch<React.SetStateAction<EventWithGames | undefined>>;
};

const EventHome = ({ event, selectedTab, setEvent }: EventHomeProps) => {
    const [games, setGames] = useState<Game[]>();
    const [addGames, setAddGames] = useState(false);
    const [error, setError] = useState("")


    const getGames = async () => {
        try {
            const response = await getAllGames();

            setGames(response);
            setAddGames(true);
        } catch (error) {
            console.error("Failed to load games:", error);
        }
    };

    const removeGame = async (gameId: number) => {
        try {
            setError("")
            await removeGameFromEvent(gameId, event.id, event.group_id);

            setEvent((currentEvent) => {
                if (!currentEvent) {
                    return currentEvent;
                }

                return {
                    ...currentEvent,
                    games: currentEvent.games.filter(
                        (game) => game.id !== gameId
                    ),
                };
            });
        } catch (error) {
            setError("You do not have permission to remove a game")
            console.error("Failed to remove game from event:", error);
        }
    };

    return (
        <View>
            <Text style={styles.sectionTitle}>Games</Text>

            {event.games.length > 0 ? (
                event.games.map((game) => (
                    <View key={game.id} style={styles.gameCard}>
                        <Text style={styles.gameTitle}>{game.title}</Text>
                        <View style={styles.buttonCon}>
                            <Text>{error}</Text>
                            <Button
                                title="Remove Game From Event"
                                onPress={() => removeGame(game.id)}
                                variant="dangerOutline"
                                disabled={false}
                            />
                        </View>
                    </View>
                ))
            ) : (
                <Text>No Games Currently Added</Text>
            )}

            {addGames && games && (
                <GamesListModal
                    visible={addGames}
                    games={games}
                    eventId={event.id}
                    onClose={() => setAddGames(false)}
                    selectedTab={selectedTab}
                    group_id={event.group_id}
                    setEvent={setEvent}
                />
            )}

            <View style={styles.RowContainer}>
                <Button title="Add Games" onPress={getGames} variant="primary" disabled={false} />

                <DeleteEventButton group_id={event.group_id} eventId={event.id} />
            </View>
        </View>
    );
};

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
        flex:1,
        flexDirection: "row"
    },

    gameTitle: {
        fontSize: 17,
        fontWeight: "600",
    },

    RowContainer: {
        flexDirection: "row",
        gap: 8,
    },

    buttonCon: {
        marginLeft: "auto",
    }
});

export default EventHome;
