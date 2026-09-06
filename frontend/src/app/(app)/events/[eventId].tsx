import EventHome from "@/components/events/eventHome";
import EventIdHeader from "@/components/events/eventIdHeader";
import Poll from "@/components/events/eventPoll";
import Result from "@/components/events/results/results";
import { getEventById } from "@/services/event";
import { EventWithGames } from "@/types/apiDataTypes";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import EventAtendees from "@/components/events/eventAtendees";
import { styles } from "@/styles/eventId";
import Button from "@/components/generalComponents/Button";

const EventPage = () => {
    const { eventId } = useLocalSearchParams();
    const [event, setEvent] = useState<EventWithGames>();
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState<"collection" | "database" | "add" | "addtoevent" | "polls" | "results">(
        "addtoevent"
    );

    useFocusEffect(
        useCallback(() => {
            const getData = async () => {
                try {
                    setLoading(true);

                    const response = await getEventById(eventId);

                    setEvent(response);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

            if (eventId) {
                getData();
            }

            return () => {};
        }, [eventId])
    );

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
        <ScrollView style={styles.container}>
            <View style={styles.tabs}>
                <Pressable
                    style={[styles.tab, selectedTab === "addtoevent" && styles.selectedTab]}
                    onPress={() => setSelectedTab("addtoevent")}
                >
                    <Text>Home</Text>
                </Pressable>

                <Pressable
                    style={[styles.tab, selectedTab === "polls" && styles.selectedTab]}
                    onPress={() => setSelectedTab("polls")}
                >
                    <Text>Polls</Text>
                </Pressable>

                <Pressable
                    style={[styles.tab, selectedTab === "results" && styles.selectedTab]}
                    onPress={() => setSelectedTab("results")}
                >
                    <Text>Results</Text>
                </Pressable>
            </View>
            <EventIdHeader event={event} />

            {selectedTab === "polls" && (
                <Poll poll={event.polls[0]} selectedTab={selectedTab} setEvent={setEvent} group_id={event.group_id} />
            )}

            {selectedTab === "addtoevent" && (
                <>
                    <EventAtendees members={event.members} event_id={event.id} setEvent={setEvent} />
                    <EventHome event={event} selectedTab={selectedTab} setEvent={setEvent} />
                </>
            )}

            {selectedTab === "results" && <Result event={event} selectedTab={selectedTab} setEvent={setEvent} />}
        </ScrollView>
    );
};

export default EventPage;
