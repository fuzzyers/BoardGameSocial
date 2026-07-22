import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { register } from "../../services/register";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        autoCapitalize="words"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.button}>
        <Button
          title="Register"
          onPress={() => register(name, email, password, confirmPassword).catch(err => setError("Registration failed"))}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

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

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },
});