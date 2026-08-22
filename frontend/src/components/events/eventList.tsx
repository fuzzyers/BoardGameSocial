import { FlatList, StyleSheet, Text, View } from "react-native";
import EventCard from "./eventCard";
import { Event } from "@/types/apiDataTypes";

type EventListProps = {
    events: Event[];
};

const EventList = ({ events }: EventListProps) => {
    if (events.length === 0) {
        return (
            <View style={styles.empty}>
                <Text>No events found.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={events}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <EventCard event={item} />}
            contentContainerStyle={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 16,
    },

    empty: {
        padding: 20,
        alignItems: "center",
    },
});

export default EventList;
