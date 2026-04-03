import { Image } from "expo-image";
import { useCallback } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GradientButton } from "@/components/ui";
import type { AuthStackScreenProps } from "@/navigation/types";
import { colors, spacing, typography } from "@/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function WelcomeScreen({ navigation }: AuthStackScreenProps<"Welcome">) {
  const insets = useSafeAreaInsets();

  const handleContinue = useCallback(() => {
    navigation.navigate("Login");
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={{ height: Math.max(insets.top, spacing.m) }} />

      <View style={styles.logoRow}>
        <Image
          source={require("../../../../assets/icon.png")}
          style={styles.logoImage}
          contentFit="contain"
        />
      </View>

      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../../../assets/welcome_illustration.png")}
          style={styles.illustration}
          contentFit="contain"
        />
      </View>

      <View style={styles.headlineContainer}>
        <Text style={styles.headline}>
          Practice Top Interview{"\n"}
          Questions <Text style={{ color: colors.primary }}>with AI</Text>
        </Text>
      </View>

      <View style={styles.spacer} />

      <View style={styles.buttonContainer}>
        <GradientButton
          label="Let's go"
          iconName="checkmark-circle-outline"
          onPress={handleContinue}
        />

        <Text style={styles.legalText}>
          By continuing, you acknowledge agreeing to our{"\n"}
          <Text style={styles.legalLink}>terms of service</Text> and{" "}
          <Text style={styles.legalLink}>privacy policy</Text>
        </Text>
      </View>

      <View style={{ height: Math.max(insets.bottom, spacing.m) }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoRow: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xxxl,
    marginBottom: spacing.xxl,
  },
  logoImage: {
    width: 180,
    height: 54,
  },
  illustrationContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xxxl,
    marginBottom: spacing.xl,
  },
  illustration: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_WIDTH * 0.75,
  },
  headlineContainer: {
    paddingHorizontal: spacing.screenPadding,
    alignItems: "center",
  },
  headline: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: 22,
    lineHeight: 30,
    color: colors.textPrimary,
    textAlign: "center",
  },
  spacer: {
    flex: 0.7,
  },
  buttonContainer: {
    paddingHorizontal: spacing.screenPadding,
    marginBottom: spacing.s,
  },
  legalText: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.xl,
    lineHeight: 18,
  },
  legalLink: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: typography.sizes.xs,
    color: colors.textPrimary,
    textDecorationLine: "underline",
  },
});

export default WelcomeScreen;
