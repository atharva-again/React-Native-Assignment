import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { memo, useCallback, useMemo } from "react";
import { type DimensionValue, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { GradientButton } from "@/components/ui/gradient-button";
import { Text } from "@/components/ui/text";
import type { RootStackParamList } from "@/navigation/types";
import { colors, palette } from "@/theme";
import { spacing } from "@/theme/spacing";
import type { Question } from "@/types";

export interface QuestionCardProps {
  question: Question;
  onPress?: () => void;
  index?: number;
  isSelected?: boolean;
}

const ReflectionStrips = () => (
  <View style={StyleSheet.absoluteFill} pointerEvents="none">
    <View style={[styles.reflectionStrip, { left: "15%", width: 30 }]} />
    <View style={[styles.reflectionStrip, { left: "45%", width: 15 }]} />
  </View>
);

export const QuestionCard = memo(function QuestionCard({
  question,
  onPress,
  index = 0,
  isSelected = false,
}: QuestionCardProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleFeedbackPress = useCallback(() => {
    navigation.navigate("SessionResult", {
      questionId: question.id,
      isCorrect: true,
      score: 85,
    });
  }, [navigation, question.id]);

  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  // Staggering logic (Zig-zag pattern)
  const marginLeft = useMemo(() => {
    const offsets = ["5%", "15%", "35%", "30%", "25%", "20%"];
    return offsets[index % offsets.length];
  }, [index]);

  const isCompleted = index === 0;
  const isCurrent = index === 1;
  const isLocked = index > 1;

  const variant = useMemo(() => {
    if (isCompleted) {
      return {
        pillBg: colors.cardGreen,
        circleBg: colors.cardGreenDark,
        shadow: colors.cardGreenDarker,
        textColor: palette.textDark,
        logoBg: palette.white,
      };
    }
    if (isCurrent) {
      return {
        pillBg: colors.cardOrange,
        circleBg: palette.cardYellow,
        shadow: palette.badgeGold,
        textColor: palette.textDark,
        logoBg: palette.white,
      };
    }
    return {
      pillBg: palette.gray20,
      circleBg: palette.gray30,
      shadow: palette.gray40,
      textColor: palette.gray70,
      logoBg: palette.gray30,
    };
  }, [isCompleted, isCurrent]);

  return (
    <View style={[styles.outerContainer, isSelected && { zIndex: 100 }]}>
      <Animated.View
        entering={FadeInDown.delay(index * 100).duration(400)}
        style={[styles.animatedWrapper, { marginLeft: marginLeft as DimensionValue }]}
      >
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.9}
          onPress={handlePress}
          disabled={isLocked}
        >
          <View style={[styles.pillContainer, { backgroundColor: variant.shadow }]}>
            <View style={[styles.pillInner, { backgroundColor: variant.pillBg }]}>
              {!isLocked && <ReflectionStrips />}
              <View style={styles.pillContent}>
                <Text variant="s" weight="bold" color={variant.textColor}>
                  {question.companyName}
                </Text>
                <View style={[styles.logoContainer, { backgroundColor: variant.logoBg }]}>
                  <Image
                    source={{ uri: question.companyLogoUrl }}
                    style={styles.logo}
                    contentFit="contain"
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.circleContainer, { backgroundColor: variant.shadow }]}>
            {isCurrent && !isSelected && (
              <View style={styles.startBadge}>
                <Text style={styles.startText} numberOfLines={1}>
                  START
                </Text>
                <View style={styles.triangleContainer}>
                  <View style={styles.startBadgeTriangle} />
                </View>
              </View>
            )}
            <View style={[styles.circleInner, { backgroundColor: variant.circleBg }]}>
              {!isLocked && <ReflectionStrips />}
              <Text style={[styles.numberText, { color: variant.textColor }]}>
                {question.questionNumber}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {isSelected && (
        <View style={styles.expandedContainer}>
          <View
            style={[
              styles.triangle,
              {
                marginLeft:
                  index === 0
                    ? 135
                    : index === 1
                      ? 170
                      : index === 2
                        ? 240
                        : index === 3
                          ? 220
                          : 200,
              },
            ]}
          />
          <View style={styles.expandedContent}>
            <Text weight="bold" style={styles.questionText}>
              {question.text}
            </Text>
            <View style={styles.questionMeta}>
              <Text variant="xs" color={palette.gray70}>
                Asked by{" "}
                <Text variant="xs" weight="bold">
                  {question.companyName}
                </Text>
              </Text>
              <View style={styles.timeRow}>
                <Ionicons name="time-outline" size={14} color={palette.gray70} />
                <Text variant="xs" weight="bold" color={palette.gray70}>
                  {" "}
                  2 mins
                </Text>
              </View>
            </View>

            <GradientButton
              label="FEEDBACK"
              colors={[palette.white, palette.white]}
              textColor={palette.iconGreen}
              bottomShadowColor={colors.gold60}
              shadowHeight={4}
              size="small"
              fullWidth
              style={styles.actionButton}
              onPress={handleFeedbackPress}
            />

            <GradientButton
              label="AI VS AI (LISTEN)"
              colors={[colors.olive70, colors.olive70]}
              textColor={palette.white}
              bottomShadowColor={colors.olive90}
              shadowHeight={4}
              iconName="headset"
              size="small"
              fullWidth
              style={styles.actionButton}
            />
          </View>
          <View style={styles.expandedFooter}>
            <View style={styles.usersRow}>
              <Ionicons name="flag" size={14} color={palette.badgeGold} />
              <Text variant="xs" color={palette.badgeGold} weight="bold">
                {question.completedTodayCount.toLocaleString()} users completed Question{" "}
                {question.questionNumber} today
              </Text>
              <Ionicons name="flag" size={14} color={palette.badgeGold} />
            </View>
            <View style={styles.dashedLine} />
          </View>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    marginBottom: spacing.m,
  },
  animatedWrapper: {
    zIndex: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 110,
  },
  pillContainer: {
    height: 84,
    minWidth: 220,
    borderRadius: 42,
    paddingBottom: 8,
    zIndex: 1,
  },
  pillInner: {
    height: "100%",
    borderRadius: 42,
    paddingHorizontal: spacing.xl,
    justifyContent: "center",
    overflow: "hidden",
  },
  pillContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: spacing.s,
  },
  logoContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 18,
    height: 18,
  },
  circleContainer: {
    width: 84,
    height: 84,
    borderRadius: 42,
    paddingBottom: 6,
    marginLeft: -76,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  circleInner: {
    width: "100%",
    height: "100%",
    borderRadius: 42,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  reflectionStrip: {
    position: "absolute",
    top: -50,
    bottom: -50,
    backgroundColor: colors.overlayWhite25,
    transform: [{ rotate: "45deg" }],
  },
  numberText: {
    fontSize: 48,
    fontWeight: "900",
  },
  startBadge: {
    position: "absolute",
    top: -40,
    alignSelf: "center",
    backgroundColor: palette.white,
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: palette.iconGreen,
    zIndex: 30,
    minWidth: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  startText: {
    color: palette.iconGreen,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  triangleContainer: {
    position: "absolute",
    bottom: -10,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  startBadgeTriangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: palette.iconGreen,
  },
  expandedContainer: {
    marginTop: -10,
    zIndex: 20,
    width: "100%",
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 14,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: colors.bannerYellowStrong,
  },
  expandedContent: {
    backgroundColor: colors.bannerYellowStrong,
    borderRadius: 20,
    padding: spacing.m,
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  questionText: {
    fontSize: 17,
    lineHeight: 24,
    marginBottom: spacing.s,
    color: palette.textDark,
  },
  questionMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.m,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    width: "100%",
    borderRadius: 14,
    marginBottom: spacing.xs,
    shadowOpacity: 0,
    elevation: 0,
  },
  expandedFooter: {
    alignItems: "center",
    paddingVertical: spacing.s,
  },
  usersRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: spacing.xxs,
  },
  dashedLine: {
    width: "100%",
    height: 1,
    borderWidth: 1,
    borderColor: palette.badgeGold,
    borderStyle: "dashed",
    marginTop: spacing.xxs,
  },
});
