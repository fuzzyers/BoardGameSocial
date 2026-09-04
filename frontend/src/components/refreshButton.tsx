import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

type RefreshButtonProps = {
    onPress: () => void;
    refreshing?: boolean;
};

const RefreshButton = ({ onPress, refreshing = false }: RefreshButtonProps) => {
    return (
        <Pressable style={styles.button} onPress={onPress} disabled={refreshing}>
            {refreshing ? <ActivityIndicator size="small" /> : <Text style={styles.text}>↻</Text>}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        fontSize: 24,
    },
});

export default RefreshButton;
