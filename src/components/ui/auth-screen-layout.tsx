import type React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing } from "@/theme";

interface AuthScreenLayoutProps {
  children: React.ReactNode;
}

export function AuthScreenLayout({ children }: AuthScreenLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={{ height: Math.max(insets.top, spacing.m) }} />
      {children}
      <View style={{ height: Math.max(insets.bottom, spacing.m) }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
