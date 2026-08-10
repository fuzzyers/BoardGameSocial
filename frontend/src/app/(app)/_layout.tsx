import { connectSocket, disconnectSocket } from "@/services/socket";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";

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
                }}
            />

            <Tabs.Screen
                name="games"
                options={{
                    title: "Games",
                }}
            />

            <Tabs.Screen
                name="groups"
                options={{
                    title: "Groups",
                }}
            />

            <Tabs.Screen
                name="events"
                options={{
                    title: "Events",
                }}
            />
        </Tabs>
    );
}
