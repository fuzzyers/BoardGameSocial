import { Button } from "react-native";
import { StyleSheet, Text, View } from 'react-native';
import { deleteToken } from '@/services/auth';
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const handleLogout = async () => {
    deleteToken(); // Call the deleteToken function to remove the token from AsyncStorage
    router.push("/(auth)/login"); // Redirect to the login page after logout
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to BoardGame Social</Text>
      <Text style={styles.subtitle}>Start building your app from here.</Text>
      <Button title="logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
