import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Register() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
      />

      <View style={styles.button}>
        <Button
          title="Register"
          onPress={() => console.log("Register pressed")}
        />
      </View>

        <Link href="/(auth)/login">
            <Text style={styles.login}>
                Already have an account? Login
            </Text>
        </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  button: {
    marginTop: 10,
  },

  login: {
    marginTop: 20,
    textAlign: "center",
    color: "blue",
  },
});