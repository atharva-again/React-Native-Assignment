import { Image } from "expo-image";
import { memo, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/text";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import type { SessionResult } from "@/types";

export interface KeyMomentsTabProps {
  sessionResult: SessionResult;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const MomentRow = memo(
  ({ moment, isLast }: { moment: SessionResult["keyMoments"][number]; isLast: boolean }) => (
    <View style={styles.momentRow}>
      <Text variant="s" weight="medium" color={colors.textSecondary} style={styles.timestamp}>
        {moment.timestamp}
      </Text>
      <View style={styles.timelineIndicator}>
        <View
          style={[styles.dot, moment.type === "positive" ? styles.dotPositive : styles.dotNegative]}
        />
        {!isLast && <View style={styles.line} />}
      </View>
      <Text variant="m" style={styles.description}>
        {moment.description}
      </Text>
    </View>
  ),
);

export const KeyMomentsTab = memo(function KeyMomentsTab({ sessionResult }: KeyMomentsTabProps) {
  const formattedTotalDuration = useMemo(
    () => formatDuration(sessionResult.audioDurationSeconds),
    [sessionResult.audioDurationSeconds],
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="l" weight="bold" style={styles.title}>
        Key Moments
      </Text>

      <View style={styles.audioPlayer}>
        <View style={styles.playButton}>
          <Image
            source="sf:play.fill"
            style={styles.playIcon}
            tintColor={colors.textInverse}
            cachePolicy="memory-disk"
          />
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
          <View style={styles.timeContainer}>
            <Text
              variant="xs"
              color={colors.textSecondary}
              accessibilityLabel="Audio progress at zero seconds"
            >
              00:00
            </Text>
            <Text
              variant="xs"
              color={colors.textSecondary}
              accessibilityLabel={`Audio duration ${formattedTotalDuration}`}
            >
              {formattedTotalDuration}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.momentsList}>
        {sessionResult.keyMoments.map((moment, index) => (
          <MomentRow
            key={moment.timestamp}
            moment={moment}
            isLast={index === sessionResult.keyMoments.length - 1}
          />
        ))}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.screenPadding,
  },
  title: {
    marginBottom: spacing.l,
  },
  audioPlayer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    padding: spacing.m,
    borderRadius: spacing.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
    gap: spacing.m,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    width: 16,
    height: 16,
    marginLeft: 2,
  },
  progressContainer: {
    flex: 1,
    gap: spacing.xs,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    width: "100%",
  },
  progressBarFill: {
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    width: "30%",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  momentsList: {
    gap: spacing.l,
  },
  momentRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: spacing.m,
  },
  timestamp: {
    width: 45,
    marginTop: 2,
  },
  timelineIndicator: {
    alignItems: "center",
    width: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
    zIndex: 1,
  },
  dotPositive: {
    backgroundColor: colors.success,
  },
  dotNegative: {
    backgroundColor: colors.error,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginTop: 4,
    marginBottom: -20,
  },
  description: {
    flex: 1,
    flexWrap: "wrap",
    marginTop: 1,
  },
});
