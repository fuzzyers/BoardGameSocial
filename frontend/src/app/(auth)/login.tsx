import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

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

      <View style={styles.button}>
        <Button 
          title="Login"
          onPress={() => console.log("Login pressed")}
        />
      </View>

      <Link href="/(auth)/register">
        <Text style={styles.register}>
          Don't have an account? Register
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

  register: {
    marginTop: 20,
    textAlign: "center",
    color: "blue",
  },
});