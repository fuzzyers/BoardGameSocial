import { getSocket } from "@/services/socket";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
    const handleLogout = async () => {
        const socket = getSocket();
        if (!socket) return;
        socket.disconnect();
        router.push("/(auth)/login");
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={handleLogout}>
                <Text>Logout</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        padding: 24,
    },

    containerRight: {
        flex: 1,
    },
});
