import { createGame } from "@/services/games";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
    useWindowDimensions,
} from "react-native";

type AddGameFormProps = {
    onGameAdded?: () => void;
};

const AddGameForm = ({ onGameAdded }: AddGameFormProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [minPlayers, setMinPlayers] = useState("");
    const [maxPlayers, setMaxPlayers] = useState("");
    const [minPlayTime, setMinPlayTime] = useState("");
    const [maxPlayTime, setMaxPlayTime] = useState("");
    const [minAge, setMinAge] = useState("");
    const [addToCollection, setAddToCollection] = useState(true);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const { width } = useWindowDimensions();
    const isMobile = width < 600;

    const handleSubmit = async () => {
        if (loading) return;

        setLoading(true);
        setMessage("");

        const game = {
            title,
            description,
            min_players: Number(minPlayers),
            max_players: Number(maxPlayers),
            min_play_time: Number(minPlayTime),
            max_play_time: Number(maxPlayTime),
            min_age: Number(minAge),
            add_to_collection: addToCollection,
        };

        try {
            const response = await createGame(game);

            console.log(response);

            setSuccess(true);
            setMessage("Game added successfully!");

            onGameAdded?.();
        } catch (error) {
            console.error(error);

            setSuccess(false);
            setMessage("Failed to add game. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
        >
            <View
                style={[
                    styles.form,
                    isMobile && styles.mobileForm,
                ]}
            >
                <Text style={styles.heading}>
                    Add New Game
                </Text>

                <Text style={styles.label}>
                    Game Title
                </Text>

                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="e.g. Catan"
                    editable={!loading}
                />

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
                    placeholder="Enter a description..."
                    multiline
                    textAlignVertical="top"
                    editable={!loading}
                />

                <View
                    style={[
                        styles.row,
                        isMobile && styles.mobileRow,
                    ]}
                >
                    <View style={styles.halfInput}>
                        <Text style={styles.label}>
                            Min Players
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={minPlayers}
                            onChangeText={setMinPlayers}
                            placeholder="2"
                            keyboardType="numeric"
                            editable={!loading}
                        />
                    </View>

                    <View style={styles.halfInput}>
                        <Text style={styles.label}>
                            Max Players
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={maxPlayers}
                            onChangeText={setMaxPlayers}
                            placeholder="4"
                            keyboardType="numeric"
                            editable={!loading}
                        />
                    </View>
                </View>

                <View
                    style={[
                        styles.row,
                        isMobile && styles.mobileRow,
                    ]}
                >
                    <View style={styles.halfInput}>
                        <Text style={styles.label}>
                            Min Play Time
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={minPlayTime}
                            onChangeText={setMinPlayTime}
                            placeholder="30"
                            keyboardType="numeric"
                            editable={!loading}
                        />
                    </View>

                    <View style={styles.halfInput}>
                        <Text style={styles.label}>
                            Max Play Time
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={maxPlayTime}
                            onChangeText={setMaxPlayTime}
                            placeholder="90"
                            keyboardType="numeric"
                            editable={!loading}
                        />
                    </View>
                </View>

                <Text style={styles.label}>
                    Minimum Age
                </Text>

                <TextInput
                    style={styles.input}
                    value={minAge}
                    onChangeText={setMinAge}
                    placeholder="10"
                    keyboardType="numeric"
                    editable={!loading}
                />

                <View style={styles.collectionRow}>
                    <View style={styles.collectionText}>
                        <Text style={styles.collectionTitle}>
                            Add to my collection
                        </Text>

                        <Text style={styles.collectionDescription}>
                            Add this game to your collection
                            after creating it.
                        </Text>
                    </View>

                    <Switch
                        value={addToCollection}
                        onValueChange={setAddToCollection}
                        disabled={loading}
                    />
                </View>

                {message !== "" && (
                    <View
                        style={[
                            styles.message,
                            success
                                ? styles.successMessage
                                : styles.errorMessage,
                        ]}
                    >
                        <Text
                            style={[
                                styles.messageText,
                                success
                                    ? styles.successText
                                    : styles.errorText,
                            ]}
                        >
                            {message}
                        </Text>
                    </View>
                )}

                <Pressable
                    style={[
                        styles.submitButton,
                        loading && styles.disabledButton,
                    ]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Text style={styles.submitButtonText}>
                        {loading
                            ? "Adding..."
                            : "Add Game"}
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        padding: 20,
        alignItems: "center",
    },

    form: {
        width: "100%",
        maxWidth: 700,
    },

    mobileForm: {
        maxWidth: undefined,
    },

    heading: {
        fontSize: 24,
        fontWeight: "700",
        color: "#222",
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#444",
        marginBottom: 6,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        backgroundColor: "#fff",
        marginBottom: 16,
    },

    descriptionInput: {
        height: 100,
    },

    row: {
        flexDirection: "row",
        gap: 12,
    },

    mobileRow: {
        flexDirection: "column",
        gap: 0,
    },

    halfInput: {
        flex: 1,
    },

    collectionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
        paddingHorizontal: 4,
        marginTop: 4,
        marginBottom: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },

    collectionText: {
        flex: 1,
        paddingRight: 15,
    },

    collectionTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
    },

    collectionDescription: {
        fontSize: 12,
        color: "#777",
        marginTop: 3,
    },

    message: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },

    successMessage: {
        backgroundColor: "#e8f5e9",
    },

    errorMessage: {
        backgroundColor: "#ffebee",
    },

    messageText: {
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
    },

    successText: {
        color: "#2e7d32",
    },

    errorText: {
        color: "#c62828",
    },

    submitButton: {
        backgroundColor: "#4A90E2",
        paddingVertical: 13,
        borderRadius: 8,
        alignItems: "center",
    },

    disabledButton: {
        opacity: 0.6,
    },

    submitButtonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },
});

export default AddGameForm;
