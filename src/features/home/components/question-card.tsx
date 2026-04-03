import { Image } from "expo-image";
import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, Layout } from "react-native-reanimated";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import type { Question } from "@/types";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export interface QuestionCardProps {
  question: Question;
  isFirst?: boolean;
  onPress?: () => void;
  onStartPress?: () => void;
  index?: number;
}

export const QuestionCard = memo(function QuestionCard({
  question,
  isFirst = false,
  onPress,
  onStartPress,
  index = 0,
}: QuestionCardProps) {
  return (
    <AnimatedTouchableOpacity
      entering={FadeInDown.delay(index * 100).duration(400)}
      layout={Layout.springify()}
      style={styles.container}
      activeOpacity={0.9}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open question ${question.questionNumber} from ${question.companyName}`}
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
    >
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <Image
            source={{ uri: question.companyLogoUrl }}
            style={styles.logo}
            contentFit="contain"
            cachePolicy="memory-disk"
            accessibilityLabel={`${question.companyName} logo`}
          />
          <Text variant="s" weight="medium" color={colors.textSecondary}>
            {question.companyName}
          </Text>
        </View>
        <View style={styles.badge}>
          <Text variant="xs" weight="bold" color={colors.textPrimary}>
            {question.questionNumber}
          </Text>
        </View>
      </View>

      <Text variant="m" weight="semiBold" style={styles.questionText}>
        {question.text}
      </Text>

      <View style={styles.footer}>
        <Text variant="xs" color={colors.textSecondary}>
          {question.completedTodayCount.toLocaleString()} users completed this today
        </Text>
        {isFirst && (
          <Button
            title="START"
            size="small"
            style={styles.startButton}
            onPress={onStartPress}
            accessibilityLabel={`Start question ${question.questionNumber} from ${question.companyName}`}
          />
        )}
      </View>
    </AnimatedTouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardRadius,
    padding: spacing.m,
    marginBottom: spacing.m,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.s,
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: spacing.xs,
    borderRadius: 4,
  },
  badge: {
    backgroundColor: colors.background,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  questionText: {
    marginBottom: spacing.m,
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  startButton: {
    minWidth: 80,
  },
});
