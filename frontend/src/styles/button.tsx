import { StyleSheet } from "react-native";

const buttonStyles = StyleSheet.create({
    button: {
        minHeight: 44,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },

    primary: {
        backgroundColor: "#4A90E2",
    },

    primaryPressed: {
        backgroundColor: "#3B7BC4",
    },

    secondary: {
        backgroundColor: "#E5E7EB",
    },

    secondaryPressed: {
        backgroundColor: "#D1D5DB",
    },

    danger: {
        backgroundColor: "#DC2626",
    },

    dangerPressed: {
        backgroundColor: "#B91C1C",
    },

    success: {
        backgroundColor: "#2E7D32",
    },

    successPressed: {
        backgroundColor: "#256528",
    },

    outline: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D1D5DB",
    },

    outlinePressed: {
        backgroundColor: "#F3F4F6",
    },

    dangerOutline: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DC2626",
    },

    dangerOutlinePressed: {
        backgroundColor: "#FEF2F2",
    },

    disabled: {
        opacity: 0.55,
    },

    text: {
        fontSize: 14,
        fontWeight: "700",
    },

    primaryText: {
        color: "#FFFFFF",
    },

    secondaryText: {
        color: "#333333",
    },

    dangerText: {
        color: "#FFFFFF",
    },

    successText: {
        color: "#FFFFFF",
    },

    outlineText: {
        color: "#333333",
    },

    dangerOutlineText: {
        color: "#DC2626",
    },
});

export default buttonStyles