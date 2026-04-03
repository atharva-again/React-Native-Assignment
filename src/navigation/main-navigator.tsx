import { Ionicons } from "@expo/vector-icons";
import { type BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedScreen, Text as CustomText } from "@/components/ui";
import { HomeScreen } from "@/features/home/screens/home-screen";
import { SettingsScreen } from "@/features/settings/screens/settings-screen";
import type { MainTabParamList } from "@/navigation/types";
import { colors, palette } from "@/theme/colors";

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
    transform: [{ scale: withSpring(focused ? 1.1 : 1) }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name={name} size={28} color={color} />
    </Animated.View>
  );
};

const StoreTab = () => (
  <AnimatedScreen>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <CustomText variant="l" weight="medium">
        Store Tab
      </CustomText>
    </View>
  </AnimatedScreen>
);

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  // Hide tab bar on Settings screen
  const currentRouteName = state.routes[state.index].name;
  if (currentRouteName === "Settings") {
    return null;
  }

  return (
    <View style={[styles.tabBarContainer, { bottom: insets.bottom + 25 }]}>
      {/* Main Pill: Home and Settings */}
      <View style={styles.mainOuterPill}>
        <View style={styles.mainInnerPill}>
          {state.routes.map((route, index) => {
            if (route.name === "Store") return null;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            let iconName: keyof typeof Ionicons.glyphMap = "home";
            if (route.name === "Home") {
              iconName = isFocused ? "home" : "home-outline";
            } else if (route.name === "Settings") {
              iconName = isFocused ? "easel" : "easel-outline";
            }

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabButton}
                activeOpacity={0.7}
              >
                <TabIcon
                  name={iconName}
                  focused={isFocused}
                  color={isFocused ? colors.primary : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    { color: isFocused ? colors.primary : colors.textSecondary },
                  ]}
                >
                  {route.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Store Button */}
      {state.routes.map((route) => {
        if (route.name !== "Store") return null;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.storeButton}
            activeOpacity={0.8}
          >
            {/* Outer Ring (thicker at bottom) */}
            <View style={styles.storeOuterRing}>
              {/* Inner Circle (the button itself) */}
              <View style={styles.storeInnerCircle}>
                <Ionicons name="bag-handle" size={24} color={colors.tabStoreIcon} />
                <Text style={styles.storeLabelInside}>Store</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export function MainNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Store" component={StoreTab} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  mainOuterPill: {
    backgroundColor: palette.gray30,
    borderRadius: 40,
    height: 78,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 1,
    paddingHorizontal: 1,
  },
  mainInnerPill: {
    flexDirection: "row",
    backgroundColor: palette.white,
    borderRadius: 39,
    paddingHorizontal: 16,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 85,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
  storeButton: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },
  storeOuterRing: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: colors.tabRingBlue,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 1,
  },
  storeInnerCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.tabInnerBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  storeLabelInside: {
    fontSize: 12,
    marginTop: 1,
    fontWeight: "600",
    color: palette.gray80,
  },
});
