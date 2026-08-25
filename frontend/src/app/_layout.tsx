import { deleteToken, getToken, isTokenExpired } from "@/services/auth";
import { Redirect, router, Slot, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";

export default function Layout() {
    useEffect(() => {
        const checkAuth = async () => {
            const token = await getToken();

            if (!token) {
                router.push("/(auth)/login");
                return
            }

            const tokenExp = isTokenExpired(token)
            console.log(tokenExp)

            if (tokenExp){
                deleteToken()
                router.push("/(auth)/login");
            }
        };
        checkAuth();
    }, []);
    const segments = useSegments();

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Slot />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
