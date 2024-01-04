import { Slot } from "expo-router";
import { TRPCProvider } from "../trpc";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeLayout() {
  return (
    <TRPCProvider>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </TRPCProvider>
  );
}
