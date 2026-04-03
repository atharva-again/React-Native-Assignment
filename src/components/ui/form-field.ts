import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";

export const formFieldStyles = StyleSheet.create({
  label: {
    marginBottom: spacing.xxs,
  },
  errorText: {
    marginTop: spacing.xxs,
  },
  inputBase: {
    borderWidth: 1,
    borderRadius: spacing.inputRadius,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    fontSize: typography.sizes.m,
    fontFamily: typography.fonts.inter.normal,
  },
});

export function getFieldBorderColor(error: boolean | undefined, isFocused: boolean): string {
  if (error) return colors.error;
  if (isFocused) return colors.borderFocused;
  return colors.border;
}
