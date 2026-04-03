import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

export type TextVariant = keyof typeof typography.sizes;

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  weight?: keyof typeof typography.fonts.inter;
  align?: "auto" | "left" | "right" | "center" | "justify";
}

export function Text({
  variant = "m",
  color = colors.textPrimary,
  weight = "normal",
  align = "left",
  style,
  ...props
}: TextProps) {
  return (
    <RNText
      style={[
        styles.base,
        {
          fontSize: typography.sizes[variant],
          fontFamily: typography.fonts.inter[weight],
          color,
          textAlign: align,
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {},
});
