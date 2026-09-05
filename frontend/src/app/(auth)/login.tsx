import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { loginWithGoogle } from "@/services/auth";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            setError("");

            const user = await loginWithGoogle();

            console.log("Logged in user:", user);

            if (user.hasAccount === false) {
                router.replace("/(auth)/googleRegister");
                return;
            }

            router.replace("/(app)");
        } catch (error) {
            console.error("Google login failed:", error);
            setError("Google login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Welcome to BoardGameSocial
                </Text>

                <Text style={styles.subtitle}>
                    Connect with your group, discover games, and
                    organise your next game night.
                </Text>

                {error ? (
                    <Text style={styles.error}>
                        {error}
                    </Text>
                ) : null}

                <Pressable
                    style={[
                        styles.googleButton,
                        isLoading && styles.disabledButton,
                    ]}
                    onPress={handleGoogleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <View style={styles.buttonContent}>
                            <ActivityIndicator
                                size="small"
                                color="#333"
                            />

                            <Text style={styles.googleButtonText}>
                                Signing in...
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.buttonContent}>
                            <Text style={styles.googleIcon}>
                                G
                            </Text>

                            <Text style={styles.googleButtonText}>
                                Continue with Google
                            </Text>
                        </View>
                    )}
                </Pressable>

                <Text style={styles.infoText}>
                    Your account uses Google to securely sign you in.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#f5f5f5",
    },

    content: {
        width: "100%",
        maxWidth: 420,
        alignItems: "center",
    },

    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#222",
        textAlign: "center",
        marginBottom: 12,
    },

    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: "#666",
        textAlign: "center",
        marginBottom: 30,
    },

    error: {
        color: "#c62828",
        textAlign: "center",
        marginBottom: 16,
        fontSize: 14,
    },

    googleButton: {
        width: "100%",
        minHeight: 50,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#d6d6d6",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },

    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },

    googleIcon: {
        fontSize: 18,
        fontWeight: "700",
        color: "#4285F4",
    },

    googleButtonText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
    },

    disabledButton: {
        opacity: 0.6,
    },

    infoText: {
        marginTop: 16,
        fontSize: 12,
        color: "#888",
        textAlign: "center",
    },
});

export default Login;
