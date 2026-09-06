import { StyleSheet } from "react-native";

export const buttonStyle = StyleSheet.create({
    button: {
        backgroundColor: "#74cef8",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },

    deleteButton: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        backgroundColor: "#b94444",
    },

    deleteText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },

    loading: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    disabled: {
        opacity: 0.6,
    },
});