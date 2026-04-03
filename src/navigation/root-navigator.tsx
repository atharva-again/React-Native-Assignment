import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SessionResultScreen } from "@/features/session-result/screens/session-result-screen";
import { AuthNavigator } from "@/navigation/auth-navigator";
import { MainNavigator } from "@/navigation/main-navigator";
import type { RootStackParamList } from "@/navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen
        name="SessionResult"
        component={SessionResultScreen}
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
