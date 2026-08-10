import { StyleSheet, Text, View } from "react-native";

const FriendsListContainer = () => {
    return (
        <View style={styles.container}>
            <View style={styles.tape}>
                <View style={[styles.stripe, styles.stripe1]} />
                <View style={[styles.stripe, styles.stripe2]} />
                <View style={[styles.stripe, styles.stripe3]} />
                {/* <View style={[styles.stripe, styles.stripe4]} /> */}
                <View style={[styles.stripe, styles.stripe5]} />
                <View style={[styles.stripe, styles.stripe6]} />
                <View style={[styles.stripe, styles.stripe7]} />

                <Text style={styles.tapeText}>WHY ARE YOU LOOKING AT THIS ITS NOT READY YET</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",

        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,

        width: "100%",
    },

    tape: {
        position: "absolute",
        width: "140%",
        paddingVertical: 20,
        backgroundColor: "#f5c542",
        height: 120,

        justifyContent: "center",
        alignItems: "center",

        transform: [{ rotate: "-25deg" }],

        overflow: "hidden",
    },

    tapeText: {
        fontSize: 18,
        fontWeight: "900",
        color: "#111",
        letterSpacing: 2,
        textAlign: "center",
        zIndex: 2,
    },

    stripe: {
        position: "absolute",
        width: 40,
        height: "250%",
        backgroundColor: "#111",
        transform: [{ rotate: "35deg" }],
        opacity: 0.9,
    },

    stripe1: {
        left: "5%",
    },

    stripe2: {
        left: "20%",
    },

    stripe3: {
        left: "35%",
    },

    stripe4: {
        left: "50%",
    },

    stripe5: {
        left: "65%",
    },

    stripe6: {
        left: "80%",
    },

    stripe7: {
        left: "95%",
    },
});

export default FriendsListContainer;
