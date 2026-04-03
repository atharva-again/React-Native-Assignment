import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  type GestureResponderEvent,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from "react-native";
import { colors, palette } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export interface GradientButtonProps extends TouchableOpacityProps {
  label: string;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  colors?: readonly [string, string, ...string[]];
  textColor?: string;
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
  shadowColor?: string;
  bottomShadowColor?: string;
  shadowHeight?: number;
}

export function GradientButton({
  label,
  iconName,
  colors: gradientColors = [palette.orange40, palette.orange50],
  textColor = palette.white,
  fullWidth = false,
  size = "large",
  shadowColor,
  bottomShadowColor,
  shadowHeight = 4,
  style,
  disabled,
  onPress,
  ...props
}: GradientButtonProps) {
  const isSmall = size === "small";

  const handlePress = (e: GestureResponderEvent) => {
    onPress?.(e);
  };

  const content = (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.gradient, isSmall && styles.gradientSmall]}
    >
      {iconName ? <Ionicons name={iconName} size={isSmall ? 18 : 24} color={textColor} /> : null}
      <Text style={[styles.label, { color: textColor }, isSmall && styles.labelSmall]}>
        {label}
      </Text>
    </LinearGradient>
  );

  const buttonStyle = [
    styles.button,
    fullWidth && styles.fullWidth,
    {
      shadowColor:
        shadowColor ??
        (gradientColors[0] === palette.white ? colors.overlayWhite25 : palette.orange70),
    },
    style,
  ];

  if (bottomShadowColor) {
    return (
      <View
        style={[
          styles.shadowWrapper,
          fullWidth && styles.fullWidth,
          style,
          { backgroundColor: bottomShadowColor, paddingBottom: shadowHeight },
        ]}
      >
        <TouchableOpacity
          style={[styles.button, styles.fullWidth]}
          activeOpacity={0.85}
          disabled={disabled}
          onPress={handlePress}
          {...props}
        >
          {content}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      activeOpacity={0.85}
      disabled={disabled}
      onPress={handlePress}
      {...props}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    borderRadius: spacing.cardRadius,
    alignSelf: "center",
    width: "90%",
  },
  button: {
    borderRadius: spacing.cardRadius,
    alignSelf: "center",
    width: "90%",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  fullWidth: {
    width: "100%",
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.xxl,
    gap: spacing.s,
    borderRadius: spacing.cardRadius,
  },
  gradientSmall: {
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
    gap: spacing.xs,
  },
  label: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.l,
    color: palette.white,
  },
  labelSmall: {
    fontSize: typography.sizes.m,
  },
});
