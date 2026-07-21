import { Redirect, Slot, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

export default function Layout() {
  const isSignedIn = false;
  const segments = useSegments();

  const inAuthGroup = segments[0] === "(auth)";

  if (!isSignedIn && !inAuthGroup) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});