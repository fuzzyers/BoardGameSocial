import { useState } from "react";
import {
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createEvent } from "@/services/event";

type CreateEventModalProps = {
    visible: boolean;
    onClose: () => void;
    groupId: number;
};

const CreateEventModal = ({
    visible,
    onClose,
    groupId,
}: CreateEventModalProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    const [eventDate, setEventDate] = useState<Date | null>(null);

    const [showDatePicker, setShowDatePicker] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleDateChange = (
        event: any,
        selectedDate?: Date
    ) => {
        if (Platform.OS !== "ios") {
            setShowDatePicker(false);
        }

        if (selectedDate) {
            setEventDate(selectedDate);
        }
    };

    const handleCreate = async () => {
        if (!name.trim()) {
            setError("Please enter an event name.");
            return;
        }

        if (!eventDate) {
            setError("Please select an event date.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await createEvent({
                group_id: groupId,
                name: name.trim(),
                description: description.trim(),
                location: location.trim(),
                event_date: eventDate.toISOString(),
            });

            setName("");
            setDescription("");
            setLocation("");
            setEventDate(null);

            onClose();
        } catch (error) {
            console.error("Failed to create event:", error);

            setError(
                "Failed to create event. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (loading) return;

        setName("");
        setDescription("");
        setLocation("");
        setEventDate(null);
        setError("");

        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={handleClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>
                        Create Event
                    </Text>

                    {/* EVENT NAME */}

                    <Text style={styles.label}>
                        Event Name
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Game night"
                        editable={!loading}
                    />

                    {/* DESCRIPTION */}

                    <Text style={styles.label}>
                        Description
                    </Text>

                    <TextInput
                        style={[
                            styles.input,
                            styles.descriptionInput,
                        ]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="What's happening?"
                        multiline
                        editable={!loading}
                    />

                    {/* LOCATION */}

                    <Text style={styles.label}>
                        Location
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={location}
                        onChangeText={setLocation}
                        placeholder="Where is it happening?"
                        editable={!loading}
                    />

                    {/* DATE */}

                    <Text style={styles.label}>
                        Event Date
                    </Text>

                    {Platform.OS === "web" ? (
                        <input
                            type="datetime-local"
                            value={
                                eventDate
                                    ? formatDateForWeb(eventDate)
                                    : ""
                            }
                            onChange={(event) => {
                                const value =
                                    event.target.value;

                                if (value) {
                                    setEventDate(
                                        new Date(value)
                                    );
                                } else {
                                    setEventDate(null);
                                }
                            }}
                            disabled={loading}
                            style={styles.webDateInput}
                        />
                    ) : (
                        <>
                            <Pressable
                                style={styles.dateButton}
                                onPress={() =>
                                    setShowDatePicker(true)
                                }
                                disabled={loading}
                            >
                                <Text
                                    style={
                                        eventDate
                                            ? styles.dateText
                                            : styles.placeholderText
                                    }
                                >
                                    {eventDate
                                        ? eventDate.toLocaleString()
                                        : "Select date and time"}
                                </Text>
                            </Pressable>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={
                                        eventDate ||
                                        new Date()
                                    }
                                    mode="datetime"
                                    display="default"
                                    onChange={
                                        handleDateChange
                                    }
                                />
                            )}
                        </>
                    )}

                    {/* ERROR */}

                    {error !== "" && (
                        <Text style={styles.errorText}>
                            {error}
                        </Text>
                    )}

                    {/* BUTTONS */}

                    <View style={styles.actions}>
                        <Pressable
                            style={[
                                styles.cancelButton,
                                loading &&
                                    styles.disabledButton,
                            ]}
                            onPress={handleClose}
                            disabled={loading}
                        >
                            <Text style={styles.cancelText}>
                                Cancel
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[
                                styles.createButton,
                                loading &&
                                    styles.disabledButton,
                            ]}
                            onPress={handleCreate}
                            disabled={loading}
                        >
                            <Text style={styles.createText}>
                                {loading
                                    ? "Creating..."
                                    : "Create Event"}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

/**
 * Converts a Date into the format required by
 * the HTML datetime-local input.
 *
 * Example:
 * 2026-08-20T19:30
 */
const formatDateForWeb = (date: Date) => {
    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    const hours = String(
        date.getHours()
    ).padStart(2, "0");

    const minutes = String(
        date.getMinutes()
    ).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default CreateEventModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    modal: {
        width: "100%",
        maxWidth: 500,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 20,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 6,
    },

    input: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        marginBottom: 16,
    },

    descriptionInput: {
        minHeight: 90,
        textAlignVertical: "top",
    },

    dateButton: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 16,
    },

    dateText: {
        fontSize: 15,
        color: "#111827",
    },

    placeholderText: {
        fontSize: 15,
        color: "#9CA3AF",
    },

    webDateInput: {
        width: "100%",
        boxSizing: "border-box",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        padding: 10,
        fontSize: 15,
        marginBottom: 16,
        backgroundColor: "#FFFFFF",
    } as any,

    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: 4,
    },

    cancelButton: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8,
    },

    cancelText: {
        color: "#6B7280",
        fontWeight: "600",
    },

    createButton: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: "#007AFF",
    },

    createText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },

    disabledButton: {
        opacity: 0.5,
    },

    errorText: {
        color: "#DC2626",
        fontSize: 13,
        marginBottom: 12,
    },
});