import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { loginWithGoogle } from "@/services/auth";
import { styles } from "@/styles/login";
import { errorStyle } from "@/styles/error";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            setError("");

            const user = await loginWithGoogle();

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
                <Text style={styles.title}>Welcome to BoardGameSocial</Text>

                <Text style={styles.subtitle}>Connect with your group, discover games, and organise your next game night.</Text>

                {error ? <Text style={errorStyle.error}>{error}</Text> : null}

                <Pressable
                    style={[styles.googleButton, isLoading && styles.disabledButton]}
                    onPress={handleGoogleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <View style={styles.buttonContent}>
                            <ActivityIndicator size="small" color="#333" />

                            <Text style={styles.googleButtonText}>Signing in...</Text>
                        </View>
                    ) : (
                        <View style={styles.buttonContent}>
                            <Text style={styles.googleIcon}>G</Text>

                            <Text style={styles.googleButtonText}>Continue with Google</Text>
                        </View>
                    )}
                </Pressable>

                <Text style={styles.infoText}>Your account uses Google to securely sign you in.</Text>
            </View>
        </View>
    );
};

export default Login;
