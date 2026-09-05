import { toggleAttendance } from "@/services/event";
import { Members } from "@/types/apiDataTypes";
import { Pressable, StyleSheet, Text, View } from "react-native";

type EventAttendeesProps = {
    members: Members[];
    event_id: number;
};

const EventAttendees = ({ members, event_id }: EventAttendeesProps) => {
    const handleToggleAttendance = async (userId: number) => {
        console.log("Toggle attendance for user:", userId);
        try {
            const response = toggleAttendance(event_id, userId)
        } catch (error) {
            
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Attendees</Text>

            {members.map((member) => (
                <View
                    key={member.id}
                    style={styles.memberRow}
                >
                    <View style={styles.memberInfo}>
                        <Text style={styles.name}>
                            {member.name}
                        </Text>

                        <Text style={styles.username}>
                            @{member.username}
                        </Text>
                    </View>

                    <Pressable
                        style={[
                            styles.attendanceButton,
                            member.attending
                                ? styles.attending
                                : styles.notAttending,
                        ]}
                        onPress={() =>
                            handleToggleAttendance(member.id)
                        }
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                member.attending
                                    ? styles.attendingText
                                    : styles.notAttendingText,
                            ]}
                        >
                            {member.attending
                                ? "Coming"
                                : "Not Coming"}
                        </Text>
                    </Pressable>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        elevation: 2,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 12,
    },

    memberRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    memberInfo: {
        flex: 1,
        minWidth: 0,
        marginRight: 12,
    },

    name: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
    },

    username: {
        marginTop: 2,
        fontSize: 13,
        color: "#777",
    },

    attendanceButton: {
        minWidth: 85,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 6,
        alignItems: "center",
        borderWidth: 1,
    },

    attending: {
        backgroundColor: "#e8f5e9",
        borderColor: "#2e7d32",
    },

    notAttending: {
        backgroundColor: "#f5f5f5",
        borderColor: "#ccc",
    },

    buttonText: {
        fontSize: 12,
        fontWeight: "600",
    },

    attendingText: {
        color: "#2e7d32",
    },

    notAttendingText: {
        color: "#777",
    },
});

export default EventAttendees;