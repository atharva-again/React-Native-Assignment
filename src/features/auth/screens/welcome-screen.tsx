import { useCallback } from "react";
import { Dimensions, StyleSheet, View, Text as RNText } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { AuthScreenLayout, GradientButton, Text } from "@/components/ui";
import type { AuthStackScreenProps } from "@/navigation/types";
import { colors, spacing, typography } from "@/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function WelcomeScreen({ navigation }: AuthStackScreenProps<"Welcome">) {
  const handleContinue = useCallback(() => {
    navigation.navigate("Login");
  }, [navigation]);

  return (
    <AuthScreenLayout>
      <View style={styles.logoRow}>
        <Animated.Image
          source={require("../../../../assets/icon.png")}
          style={styles.logoImage}
          resizeMode="contain"
          sharedTransitionTag="ready-logo"
        />
      </View>

      <Animated.View
        entering={FadeInUp.delay(200).duration(800).springify()}
        style={styles.illustrationContainer}
      >
        <Animated.Image
          source={require("../../../../assets/welcome_illustration.png")}
          style={styles.illustration}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        entering={FadeInUp.delay(400).duration(800).springify()}
        style={styles.headlineContainer}
      >
        <Text style={styles.headline}>
          Practice Top Interview{"\n"}
          Questions <RNText style={{ color: colors.primary }}>with AI</RNText>
        </Text>
      </Animated.View>

      <View style={styles.spacer} />

      <Animated.View
        entering={FadeInUp.delay(600).duration(800).springify()}
        style={styles.buttonContainer}
      >
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
      </Animated.View>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
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
