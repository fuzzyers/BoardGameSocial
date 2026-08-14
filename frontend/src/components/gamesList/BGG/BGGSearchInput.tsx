import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from "react-native";

type BGGSearchInputProps = {
    value: string;
    onChangeText: (text: string) => void;
    onSearch: () => void;
    loading: boolean;
};

const BGGSearchInput = ({ value, onChangeText, onSearch, loading }: BGGSearchInputProps) => {
    const { width } = useWindowDimensions();
    const isMobile = width < 600;

    return (
        <View style={[styles.container, isMobile && styles.mobileContainer]}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder="Search for a game..."
                editable={!loading}
                onSubmitEditing={onSearch}
                returnKeyType="search"
            />

            <Pressable
                style={[styles.button, loading && styles.disabledButton, isMobile && styles.mobileButton]}
                onPress={onSearch}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Search</Text>}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 20,
    },

    mobileContainer: {
        flexDirection: "column",
        gap: 10,
    },

    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        backgroundColor: "#fff",
    },

    button: {
        backgroundColor: "#4A90E2",
        paddingHorizontal: 22,
        paddingVertical: 11,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 100,
    },

    mobileButton: {
        width: "100%",
    },

    disabledButton: {
        opacity: 0.6,
    },

    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },
});

export default BGGSearchInput;
