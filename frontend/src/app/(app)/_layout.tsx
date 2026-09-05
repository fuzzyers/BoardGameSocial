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
                    tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
                }}
            />

            <Tabs.Screen
                name="games"
                options={{
                    title: "Games",
                    tabBarIcon: ({ color, size }) => <Ionicons name="dice" size={size} color={color} />,
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="games/[gameid]"
                options={{
                    href: null,
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="groups"
                options={{
                    title: "Groups",
                    tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles" size={size} color={color} />,
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="events/index"
                options={{
                    title: "Events",
                    tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="events/[eventId]"
                options={{
                    href: null,
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="profile/index"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" size={size} color={color} />,
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="profile/[id]"
                options={{
                    href: null,
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
