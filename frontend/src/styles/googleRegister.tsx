import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    content: {
        width: "100%",
        maxWidth: 450,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 12,
    },

    subtitle: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 32,
    },

    form: {
        width: "100%",
    },

    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 14,
        fontSize: 16,
    },

    hint: {
        fontSize: 13,
        marginTop: 6,
    },

    button: {
        height: 50,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
    },

    buttonDisabled: {
        opacity: 0.5,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "600",
    },
});