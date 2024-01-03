import { Slot } from "expo-router";
import { TRPCProvider } from "../trpc";

export default function HomeLayout() {
  return (
    <TRPCProvider>
      <Slot />
    </TRPCProvider>
  );
}
