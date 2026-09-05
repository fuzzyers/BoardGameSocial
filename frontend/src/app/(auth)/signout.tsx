import { auth } from "@/config/firebase";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const SignOutPage = () => {
    useEffect(() => {
        const logout = async () => {
            try {
                await signOut(auth);
            } catch (error) {
                console.error("Sign out failed:", error);
            } finally {
                router.replace("/(auth)/login");
            }
        };

        logout();
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default SignOutPage;
