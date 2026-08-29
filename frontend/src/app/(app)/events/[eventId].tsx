import EventHome from "@/components/events/eventHome";
import EventIdHeader from "@/components/events/eventIdHeader";
import Poll from "@/components/events/eventPoll";
import { getEventById } from "@/services/event";
import { getAllGames } from "@/services/games";
import { EventWithGames, Game } from "@/types/apiDataTypes";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

const EventPage = () => {
    const { eventId } = useLocalSearchParams();
    const [event, setEvent] = useState<EventWithGames>()
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState<"collection" | "database" | "add" | "addtoevent" | "polls">("addtoevent");

    useFocusEffect(
        useCallback(() => {
            const getData = async () => {
                try {
                    setLoading(true)

                    const response = await getEventById(eventId)

                    console.log(response)
                    setEvent(response)
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            }

            if (eventId){
                getData()
            }

        }, [eventId])
    )

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
            <View style={styles.tabs}>
                <Pressable
                    style={[
                        styles.tab,
                        selectedTab === "addtoevent" && styles.selectedTab,
                    ]}
                    onPress={() => setSelectedTab("addtoevent")}
                >
                    <Text>Home</Text>
                </Pressable>

                <Pressable
                    style={[
                        styles.tab,
                        selectedTab === "polls" && styles.selectedTab,
                    ]}
                    onPress={() => setSelectedTab("polls")}
                >
                    <Text>Polls</Text>
                </Pressable>
            </View>
            <EventIdHeader event={event}/>
            
            {selectedTab === "polls" &&
                <Poll
                    poll={event.polls[0]}
                    selectedTab={selectedTab}
                />
            }
            
            { selectedTab === "addtoevent" &&
                <EventHome event={event}/>
            }
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

    tabs: {
        flexDirection: "row",
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },

    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
    },

    selectedTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#333",
    },
});

export default EventPage;