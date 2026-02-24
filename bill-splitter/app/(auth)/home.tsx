import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import auth from "@react-native-firebase/auth";
import Button from "@/components/Button";

export default function HomeScreen() {
  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Bem-vindo ao Bill Splitter</Text>

      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B6B6B",
  },
});
