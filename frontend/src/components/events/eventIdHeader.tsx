import { EventWithGames } from "@/types/apiDataTypes"
import { Text, View, StyleSheet } from "react-native"

type EventProps = {
    event: EventWithGames
}
const EventIdHeader = async ({event}: EventProps) => {

    return (
        <View>
            <Text style={styles.title}>{event.name}</Text>
            
            <Text style={styles.description}>
                {event.description}
            </Text>

            <View style={styles.details}>
                <Text>📍 {event.location}</Text>
                <Text>
                    📅 {new Date(event.event_date).toLocaleDateString()}
                </Text>
                <Text>
                    🕐 {new Date(event.event_date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
    },

    description: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
    },

    details: {
        gap: 8,
        marginBottom: 30,
    },
});

export default EventIdHeader