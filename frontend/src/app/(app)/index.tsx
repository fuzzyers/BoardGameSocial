import Button from "@/components/generalComponents/Button";
import InstallApp from "@/components/installApp";
import { getSocket } from "@/services/socket";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
    const handleLogout = async () => {
        const socket = getSocket();
        if (!socket) return;
        socket.disconnect();
        router.push("/(auth)/signout");
    };
    

    return (
        <View style={styles.container}>
        {/*      <Button
                 title={"Install App"}
                 onPress={() => handleLogout()}
                 variant={"dangerOutline"}
                disabled={false}
             /> */}
             <InstallApp/>

            <Button
                title={"Logout"}
                onPress={() => handleLogout()}
                variant={"dangerOutline"}
                disabled={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
});
