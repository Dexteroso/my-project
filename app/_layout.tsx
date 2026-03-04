import { ThemeProvider } from "@/context/context/ThemeContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack 
        screenOptions={{
          animation: "fade",
          headerShown: false,
        }}
      />
    </ThemeProvider>
  );
}
