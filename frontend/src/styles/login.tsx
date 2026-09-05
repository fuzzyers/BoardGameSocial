import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#f5f5f5",
    },

    content: {
        width: "100%",
        alignItems: "center",
    },

    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#222",
        textAlign: "center",
        marginBottom: 12,
    },

    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: "#666",
        textAlign: "center",
        marginBottom: 30,
    },

    googleButton: {
        width: "100%",
        minHeight: 50,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#d6d6d6",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },

    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },

    googleIcon: {
        fontSize: 18,
        fontWeight: "700",
        color: "#4285F4",
    },

    googleButtonText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
    },

    disabledButton: {
        opacity: 0.6,
    },

    infoText: {
        marginTop: 16,
        fontSize: 12,
        color: "#888",
        textAlign: "center",
    },
});