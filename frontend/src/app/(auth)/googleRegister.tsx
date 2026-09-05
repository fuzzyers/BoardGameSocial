import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { createFirebaseUser } from "@/services/auth";

const GoogleRegisterPage = () => {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreateAccount = async () => {
        const trimmedUsername = username.trim();

        setError("");

        if (!trimmedUsername) {
            setError("Please enter a username");
            return;
        }

        if (trimmedUsername.length < 3) {
            setError("Username must be at least 3 characters");
            return;
        }

        if (trimmedUsername.length > 20) {
            setError("Username must be 20 characters or less");
            return;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(trimmedUsername)) {
            setError("Username can only contain letters, numbers and underscores");
            return;
        }

        try {
            setLoading(true);

            await createFirebaseUser(trimmedUsername);

            router.replace("/");
        } catch (error) {
            console.error("Account creation failed:", error);

            if (error instanceof Error && error.message === "Username already exists") {
                setError("That username is already taken");
            } else {
                setError("Unable to create your account. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome to BoardGameSocial</Text>

                <Text style={styles.subtitle}>Choose a username to finish setting up your account.</Text>

                <View style={styles.form}>
                    <Text style={styles.label}>Username</Text>

                    <TextInput
                        style={[styles.input, error ? styles.inputError : undefined]}
                        value={username}
                        onChangeText={(text) => {
                            setUsername(text);
                            setError("");
                        }}
                        placeholder="Choose a username"
                        autoCapitalize="none"
                        autoCorrect={false}
                        maxLength={20}
                        editable={!loading}
                    />

                    <Text style={styles.hint}>3–20 characters. Letters, numbers and underscores.</Text>

                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    <Pressable
                        style={[styles.button, loading || !username.trim() ? styles.buttonDisabled : undefined]}
                        onPress={handleCreateAccount}
                        disabled={loading || !username.trim()}
                    >
                        {loading ? <ActivityIndicator /> : <Text style={styles.buttonText}>Create Account</Text>}
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    content: {
        width: "100%",
        maxWidth: 450,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 12,
    },

    subtitle: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 32,
    },

    form: {
        width: "100%",
    },

    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 14,
        fontSize: 16,
    },

    inputError: {
        borderWidth: 1,
    },

    hint: {
        fontSize: 13,
        marginTop: 6,
    },

    error: {
        fontSize: 14,
        marginTop: 8,
    },

    button: {
        height: 50,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
    },

    buttonDisabled: {
        opacity: 0.5,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "600",
    },
});

export default GoogleRegisterPage;
