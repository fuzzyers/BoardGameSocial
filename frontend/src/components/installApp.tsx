import { useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

const InstallApp = () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Pressable
                style={styles.button}
                onPress={() => setVisible(true)}
            >
                <Text style={styles.buttonText}>Install App Instructions</Text>
            </Pressable>

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.title}>
                            Install BoardGameSocial
                        </Text>

                        <Text style={styles.description}>
                            Install BoardGameSocial on your device for
                            quick access and an app-like experience.
                        </Text>

                        <Text style={styles.heading}>
                            Chrome on Desktop
                        </Text>

                        <Text style={styles.text}>
                            Look for the install icon in the address bar
                            at the top of your browser. Click it and
                            select "Install".
                        </Text>

                        <Text style={styles.heading}>
                            Chrome on Android
                        </Text>

                        <Text style={styles.text}>
                            Open the three-dot menu in Chrome and select
                            "Install app" or "Add to Home screen". (This should work)
                            on most browsers not just chrome.
                        </Text>

                        <Text style={styles.heading}>
                            Safari on iPhone / iPad
                        </Text>

                        <Text style={styles.text}>
                            Tap the Share button, select "Add to Home
                            Screen", then tap "Add".
                        </Text>

                        <Pressable
                            style={styles.closeButton}
                            onPress={() => setVisible(false)}
                        >
                            <Text style={styles.closeText}>
                                Close
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "600",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },

    modal: {
        width: "100%",
        maxWidth: 500,
        maxHeight: "90%",
        backgroundColor: "white",
        borderRadius: 16,
        padding: 24,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 12,
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
    },

    heading: {
        fontSize: 17,
        fontWeight: "700",
        marginTop: 12,
        marginBottom: 6,
    },

    text: {
        fontSize: 15,
        lineHeight: 22,
    },

    closeButton: {
        marginTop: 24,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: "#208AEF",
    },

    closeText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default InstallApp;
