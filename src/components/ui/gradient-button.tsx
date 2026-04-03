import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";
import { palette } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export interface GradientButtonProps extends TouchableOpacityProps {
  label: string;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  colors?: readonly [string, string, ...string[]];
  fullWidth?: boolean;
}

export function GradientButton({
  label,
  iconName,
  colors: gradientColors = ["#FF7800", "#FF5000"],
  fullWidth = false,
  style,
  disabled,
  accessibilityLabel,
  ...props
}: GradientButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, fullWidth && styles.fullWidth, style]}
      activeOpacity={0.85}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      {...props}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        {iconName ? <Ionicons name={iconName} size={24} color={palette.white} /> : null}
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: spacing.cardRadius,
    alignSelf: "center",
    width: "90%",
    ...Platform.select({
      ios: {
        shadowColor: palette.orange70,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
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
  label: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.l,
    color: palette.white,
  },
});
