import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { login } from "../../services/login";
import { useState } from "react";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await login(email, password);
      console.log("User logged in:", data);
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        editable={!isLoading}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />

      <View style={styles.button}>
        <Button 
          title="Login"
          onPress={handleLogin}
          disabled={isLoading}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : null}

      {error ? <Text style={styles.error}>{error}</Text> : null}

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

  loader: {
    marginTop: 12,
  },

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },
});