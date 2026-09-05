import { Pressable, StyleSheet, Text } from "react-native";

type GameActionButtonProps = {
    title: string;
    loadingTitle: string;
    successTitle: string;
    errorTitle: string;
    adding: boolean;
    status: "success" | "error" | null;
    onPress: () => void;
    variant?: "primary" | "danger" | "default";
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
        minWidth: 38,
        height: 38,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2563EB",
    },

    dangerButton: {
        backgroundColor: "#DC2626",
    },

    disabled: {
        opacity: 0.55,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },
});

export default GameActionButton;
