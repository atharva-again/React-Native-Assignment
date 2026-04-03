import { useIsFocused } from "@react-navigation/native";
import type React from "react";
import { useEffect } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface AnimatedScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * A wrapper component that provides a subtle, elegant fade and slide-up animation
 * when the screen gains focus. Uses Reanimated for production-grade performance.
 */
export function AnimatedScreen({ children, style }: AnimatedScreenProps) {
  const isFocused = useIsFocused();

  // Shared values for animation
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10); // Reduced from 20 for subtleness

  useEffect(() => {
    if (isFocused) {
      // Fade in and slide up when focused
      opacity.value = withTiming(1, {
        duration: 500, // Slightly longer for premium feel
        easing: Easing.out(Easing.quad), // Quad is smoother than Exp for this small range
      });
      translateY.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.quad),
      });
    } else {
      // Gentle fade out
      opacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.in(Easing.quad),
      });
      translateY.value = withTiming(5, {
        duration: 300,
        easing: Easing.in(Easing.quad),
      });
    }
  }, [isFocused, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return <Animated.View style={[{ flex: 1 }, animatedStyle, style]}>{children}</Animated.View>;
}
