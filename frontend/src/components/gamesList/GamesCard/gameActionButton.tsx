import { Pressable, StyleSheet, Text } from "react-native";

type GameActionButtonProps = {
    title: string;
    loadingTitle: string;
    successTitle: string;
    errorTitle: string;
    adding: boolean;
    status: "success" | "error" | null;
    onPress: () => void;
    variant?: "primary" | "danger";
};

const GameActionButton = ({
    title,
    loadingTitle,
    successTitle,
    errorTitle,
    adding,
    status,
    onPress,
    variant = "primary",
}: GameActionButtonProps) => {
    return (
        <Pressable
            style={[styles.button, variant === "danger" && styles.dangerButton, adding && styles.disabled]}
            onPress={onPress}
            disabled={adding}
        >
            <Text style={styles.buttonText}>
                {adding ? loadingTitle : status === "success" ? successTitle : status === "error" ? errorTitle : title}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#4A90E2",
        paddingVertical: 11,
        borderRadius: 8,
        alignItems: "center",
    },

    disabled: {
        opacity: 0.6,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "700",
    },
    dangerButton: {
        backgroundColor: "#b94444",
    },
});

export default GameActionButton;
