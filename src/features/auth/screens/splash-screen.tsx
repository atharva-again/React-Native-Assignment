import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import type { AuthStackParamList } from "@/navigation/types";
import { colors } from "@/theme";

export function SplashScreen({ navigation }: NativeStackScreenProps<AuthStackParamList, "Splash">) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../../../assets/icon.png")}
        style={styles.logo}
        resizeMode="contain"
        sharedTransitionTag="ready-logo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 180,
    height: 60,
  },
});

export default SplashScreen;
