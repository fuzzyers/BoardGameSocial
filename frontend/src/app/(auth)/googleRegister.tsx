import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { createFirebaseUser } from "@/services/auth";
import { styles } from "@/styles/googleRegister"
import { errorStyle } from "@/styles/error";

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
                        style={[styles.input, error ? errorStyle.inputError : undefined]}
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

                    {error ? <Text style={errorStyle.error}>{error}</Text> : null}

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

export default GoogleRegisterPage;
