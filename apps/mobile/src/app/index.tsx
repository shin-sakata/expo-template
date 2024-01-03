import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { api } from "../trpc";

export default function Home() {
  const { data } = api.greeting.useQuery({ name: "John" });

  return (
    <View style={styles.container}>
      <Text>{data}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
