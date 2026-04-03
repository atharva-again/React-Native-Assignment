import {
  ActivityIndicator,
  StyleSheet,
  type TextStyle,
  TouchableOpacity,
  type TouchableOpacityProps,
  type ViewStyle,
} from "react-native";
import { colors, palette } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { Text } from "./text";

export type ButtonVariant = "primary" | "secondary" | "disabled";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export function Button({
  title,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const isActuallyDisabled = disabled || loading || variant === "disabled";
  const activeVariant = isActuallyDisabled ? "disabled" : variant;

  const buttonStyles: ViewStyle[] = [
    styles.base,
    styles[`${size}Size`],
    styles[`${activeVariant}Variant`],
    style as ViewStyle,
  ];

  const textStyles: TextStyle[] = [styles[`${activeVariant}Text`]];

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={isActuallyDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={activeVariant === "primary" ? colors.buttonPrimaryText : colors.buttonPrimary}
        />
      ) : (
        <Text
          variant={size === "small" ? "s" : size === "large" ? "l" : "m"}
          weight="semiBold"
          style={textStyles}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: spacing.buttonRadius,
  },
  smallSize: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.m,
  },
  mediumSize: {
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.l,
  },
  largeSize: {
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.xl,
  },
  primaryVariant: {
    backgroundColor: colors.buttonPrimary,
    borderWidth: 1,
    borderColor: colors.buttonPrimary,
  },
  secondaryVariant: {
    backgroundColor: palette.transparent,
    borderWidth: 1,
    borderColor: colors.buttonPrimary,
  },
  disabledVariant: {
    backgroundColor: colors.buttonDisabled,
    borderWidth: 1,
    borderColor: colors.buttonDisabled,
  },
  primaryText: {
    color: colors.buttonPrimaryText,
  },
  secondaryText: {
    color: colors.buttonPrimary,
  },
  disabledText: {
    color: colors.buttonDisabledText,
  },
});
