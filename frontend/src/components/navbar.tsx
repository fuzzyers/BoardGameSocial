import { View, Text, StyleSheet, useWindowDimensions, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { deleteToken } from "@/services/auth";
import { getSocket } from "@/services/socket";

export default function Navbar() {
    const { width, height } = useWindowDimensions();
    const styles = createStyles(width, height)
    const router = useRouter();

    const handleLogout = async () => {
        await deleteToken(); 
        const socket = getSocket();
        if (!socket) return;
        socket.disconnect();
        router.push("/(auth)/login"); 
    }

    return (
        <View style={styles.navbar}>
            <Pressable style={styles.navbarButton}>
                <Text style={styles.navbarButtonText}>Groups</Text>
            </Pressable>
            <Pressable style={styles.navbarButton}>
                <Text style={styles.navbarButtonText}>Friends</Text>
            </Pressable>
            <Pressable style={styles.navbarButton}>
                <Text style={styles.navbarButtonText}>Profile</Text>
            </Pressable>
            <Pressable style={styles.navbarButton}>
                <Text style={styles.navbarButtonText}>Games</Text>
            </Pressable>
            <Pressable style={styles.navbarButton}>
                <Text style={styles.navbarButtonText}>Settings</Text>
            </Pressable>
            {/* Move function from text to button later */}
            <Pressable style={styles.navbarButton} onPress={handleLogout}>
                <Text style={styles.navbarButtonText}>
                    Logout
                </Text>
            </Pressable>
        </View>
    );
}
const createStyles = (width:number, height:number) => {
    return StyleSheet.create({
        navbar: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            backgroundColor: '#f0f0f0',
            width:"50%",
            height: "100%"
        },
        navbarButton: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width:"90%",
            marginVertical: 8,
            paddingVertical: 12,
            paddingHorizontal: 24,
            backgroundColor: '#ffffff',
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        navbarButtonText: {
            color: '#007AFF',
            fontSize: Math.min(width, height) * 0.04,
            fontWeight: '600',
        },
    });
}