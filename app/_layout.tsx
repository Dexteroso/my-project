import { Stack } from "expo-router";
import { AppProvider } from "@/context/context/AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack 
        screenOptions={{
          headerShown: false,
        }}
      />
    </AppProvider>
  );
}
