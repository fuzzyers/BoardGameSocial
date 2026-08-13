import { connectSocket } from "@/services/socket";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function AppLayout() {
    const [socketReady, setSocketReady] = useState(false);

    useEffect(() => {
        const setupSocket = async () => {
            await connectSocket();
            setSocketReady(true);
        };

        setupSocket();
    }, []);

    if (!socketReady) {
        return null; // or a loading indicator
    }

    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="games"
                options={{
                    title: "Games",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="dice" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="groups"
                options={{
                    title: "Groups",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="events"
                options={{
                    title: "Events",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
