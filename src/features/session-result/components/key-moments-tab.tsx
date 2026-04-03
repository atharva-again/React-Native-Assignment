import { Ionicons } from "@expo/vector-icons";
import { memo, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import { colors, palette } from "@/theme/colors";
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
  ({
    moment,
    index,
    isLast,
  }: {
    moment: SessionResult["keyMoments"][number];
    index: number;
    isLast: boolean;
  }) => (
    <Animated.View
      style={styles.momentRowContainer}
      entering={FadeInDown.delay(index * 100 + 500).duration(400)}
    >
      <View style={styles.momentRow}>
        <Text variant="m" weight="semiBold" color={palette.iconBlue} style={styles.timestamp}>
          {moment.timestamp}
        </Text>
        <Text variant="m" color={palette.gray80} style={styles.description}>
          {moment.description}
        </Text>
      </View>
      {!isLast && <View style={styles.separator} />}
    </Animated.View>
  ),
);

export const KeyMomentsTab = memo(function KeyMomentsTab({ sessionResult }: KeyMomentsTabProps) {
  const formattedTotalDuration = useMemo(
    () => formatDuration(sessionResult.audioDurationSeconds),
    [sessionResult.audioDurationSeconds],
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={styles.audioPlayer} entering={FadeInDown.delay(350).duration(500)}>
        <View style={styles.playButton}>
          <Ionicons name="play" size={24} color={palette.white} style={{ marginLeft: 3 }} />
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.playerHeader}>
            <Text variant="m" weight="semiBold" color={palette.orange60}>
              Mock Interview
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View style={styles.progressBarFill} />
            </View>
          </View>
          <View style={styles.timeContainer}>
            <Text variant="xs" color={palette.gray60}>
              00:00
            </Text>
            <Text variant="xs" color={palette.gray60}>
              {formattedTotalDuration}
            </Text>
          </View>
        </View>
      </Animated.View>

      <View style={styles.momentsList}>
        {sessionResult.keyMoments.map((moment, index) => (
          <MomentRow
            key={moment.timestamp}
            moment={moment}
            index={index}
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
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.screenPadding,
    paddingTop: spacing.l,
  },
  audioPlayer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.orange10,
    padding: spacing.m,
    borderRadius: 20,
    marginBottom: spacing.xl,
    gap: spacing.m,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: palette.orange50,
    justifyContent: "center",
    alignItems: "center",
  },
  playerInfo: {
    flex: 1,
    gap: spacing.xxxs,
  },
  playerHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressContainer: {
    height: 8,
    width: "100%",
    justifyContent: "center",
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: palette.gray30,
    borderRadius: 3,
    width: "100%",
  },
  progressBarFill: {
    height: 6,
    backgroundColor: palette.orange50,
    borderRadius: 3,
    width: "40%",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  momentsList: {
    gap: spacing.xs,
  },
  momentRowContainer: {
    gap: spacing.m,
  },
  momentRow: {
    gap: spacing.s,
  },
  timestamp: {
    fontSize: 16,
  },
  description: {
    lineHeight: 22,
  },
  separator: {
    height: 1,
    backgroundColor: palette.gray20,
    width: "100%",
    marginBottom: spacing.xs,
  },
});
