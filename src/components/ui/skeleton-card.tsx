import type React from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import { colors, spacing } from "@/theme";

interface SkeletonCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function SkeletonCard({ children, style }: SkeletonCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.m,
  },
});
