import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export interface IconButtonProps extends TouchableOpacityProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
}

export function IconButton({
  name,
  size = 24,
  color = colors.textPrimary,
  disabled,
  style,
  ...props
}: IconButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled, style]}
      disabled={disabled}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
