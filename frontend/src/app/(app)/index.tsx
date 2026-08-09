import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

    </View>
);
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "row",
      padding: 24,
  },

  containerRight: {
      flex: 1,
  }
});
