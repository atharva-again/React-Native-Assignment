import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback } from "react";
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { AuthStackScreenProps } from "@/navigation/types";
import { colors, palette, spacing, typography } from "@/theme";

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
        <TouchableOpacity style={styles.button} onPress={handleContinue} activeOpacity={0.85}>
          <LinearGradient
            colors={["#FF7800", "#FF5000"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.buttonGradient}
          >
            <Ionicons name="checkmark-circle-outline" size={24} color={palette.white} />
            <Text style={styles.buttonText}>Let's go</Text>
          </LinearGradient>
        </TouchableOpacity>

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
  button: {
    borderRadius: spacing.cardRadius,
    alignSelf: "center",
    width: "90%",
    ...Platform.select({
      ios: {
        shadowColor: palette.orange70,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.xxl,
    gap: spacing.s,
    borderRadius: spacing.cardRadius,
  },
  buttonText: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.l,
    color: palette.white,
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
