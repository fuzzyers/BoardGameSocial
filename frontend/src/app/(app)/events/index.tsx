import { getEvents } from "@/services/event";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import EventFilters, { EventTimeFilter } from "@/components/events/eventFilters";
import EventList from "@/components/events/eventList";
import { Event } from "@/types/apiDataTypes";

type Group = {
    id: number;
    name: string;
};

const EventsPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    const [timeFilter, setTimeFilter] = useState<EventTimeFilter>("upcoming");

    const [groupFilter, setGroupFilter] = useState<number | null>(null);

    // This would eventually come from your groups service
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        const getEventsData = async () => {
            try {
                const data = await getEvents();

                setEvents(data.results);
            } catch (error) {
                console.error("Failed to get events:", error);
            } finally {
                setLoading(false);
            }
        };

        getEventsData();
    }, []);

    const filteredEvents = useMemo(() => {
        const now = new Date();

        return events.filter((event) => {
            const eventDate = new Date(event.event_date);

            // Time filtering
            if (timeFilter === "upcoming" && eventDate < now) {
                return false;
            }

            if (timeFilter === "past" && eventDate >= now) {
                return false;
            }

            // Group filtering
            if (groupFilter !== null && event.group_id !== groupFilter) {
                return false;
            }

            return true;
        });
    }, [events, timeFilter, groupFilter]);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <EventFilters
                timeFilter={timeFilter}
                groupFilter={groupFilter}
                groups={groups}
                onTimeFilterChange={setTimeFilter}
                onGroupFilterChange={setGroupFilter}
            />

            <EventList events={filteredEvents} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default EventsPage;
