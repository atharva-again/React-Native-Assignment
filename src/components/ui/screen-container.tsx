import type React from "react";
import { type StyleProp, StyleSheet, type ViewStyle } from "react-native";
import { SafeAreaView, type SafeAreaViewProps } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export interface ScreenContainerProps extends SafeAreaViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  withPadding?: boolean;
}

export function ScreenContainer({
  children,
  style,
  withPadding = true,
  ...props
}: ScreenContainerProps) {
  return (
    <SafeAreaView style={[styles.container, withPadding && styles.padding, style]} {...props}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  padding: {
    paddingHorizontal: spacing.screenPadding,
  },
});
