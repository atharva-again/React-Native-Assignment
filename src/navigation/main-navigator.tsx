import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { HomeScreen } from "@/features/home/screens/home-screen";
import { SettingsScreen } from "@/features/settings/screens/settings-screen";
import type { MainTabParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabIcon = ({
  name,
  focused,
  color,
}: {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  color: string;
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(focused ? 1.2 : 1) }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name={name} size={24} color={color} />
    </Animated.View>
  );
};

const StoreTab = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Store Tab</Text>
  </View>
);

export function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => (
            <TabIcon name={props.focused ? "home" : "home-outline"} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreTab}
        options={{
          tabBarIcon: (props) => (
            <TabIcon name={props.focused ? "cart" : "cart-outline"} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: (props) => (
            <TabIcon name={props.focused ? "settings" : "settings-outline"} {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
