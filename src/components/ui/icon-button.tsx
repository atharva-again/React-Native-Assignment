import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { hapticTap } from "@/utils/haptics";

export interface IconButtonProps extends TouchableOpacityProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  accessibilityLabel?: string;
}

export function IconButton({
  name,
  size = 24,
  color = colors.textPrimary,
  disabled,
  style,
  onPress,
  accessibilityLabel: customA11yLabel,
  ...props
}: IconButtonProps) {
  const handlePress = async (e: Parameters<NonNullable<TouchableOpacityProps["onPress"]>>[0]) => {
    if (!disabled) {
      await hapticTap();
    }
    onPress?.(e);
  };

  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled, style]}
      disabled={disabled}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={customA11yLabel ?? name}
      accessibilityState={{ disabled: !!disabled }}
      {...props}
    >
      <Ionicons name={name} size={size} color={disabled ? colors.textDisabled : color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xs,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    opacity: 0.5,
  },
});
