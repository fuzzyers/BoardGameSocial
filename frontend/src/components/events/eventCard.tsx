import { Event } from "@/types/apiDataTypes";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type EventCardProps = {
    event: Event;
};

const EventCard = ({ event }: EventCardProps) => {
    const eventDate = new Date(event.event_date);

    const formattedDate = eventDate.toLocaleDateString();
    const formattedTime = eventDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const handlePress = () => {
        router.push(`/events/${event.id}`);
    };

    return (
        <Pressable onPress={handlePress}>
            <View style={styles.card}>
                <Text style={styles.title}>{event.name}</Text>

                <Text style={styles.description}>{event.description}</Text>

                <View style={styles.details}>
                    <Text style={styles.detail}>📍 {event.location}</Text>

                    <Text style={styles.detail}>📅 {formattedDate}</Text>

                    <Text style={styles.detail}>🕐 {formattedTime}</Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },

    description: {
        fontSize: 15,
        color: "#666",
        marginBottom: 12,
    },

    details: {
        gap: 6,
    },

    detail: {
        fontSize: 14,
        color: "#444",
    },
});

export default EventCard;
