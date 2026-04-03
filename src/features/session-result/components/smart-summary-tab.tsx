import { memo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import { colors, palette } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import type { SessionResult } from "@/types";

export interface SmartSummaryTabProps {
  sessionResult: SessionResult;
}

const BulletList = memo(({ items, emptyMessage }: { items: string[]; emptyMessage: string }) => {
  if (!items || items.length === 0) {
    return (
      <Text variant="s" color={colors.textSecondary} style={styles.emptyText}>
        {emptyMessage}
      </Text>
    );
  }

  return (
    <View style={styles.listContainer}>
      {items.map((item, index) => (
        <Animated.View
          key={item}
          style={styles.bulletItem}
          entering={FadeInDown.delay(index * 100 + 400).duration(400)}
          accessible
          accessibilityLabel={item}
        >
          <View style={styles.diamondWrapper}>
            <View style={styles.diamond} />
          </View>
          <Text variant="m" color={palette.gray70} style={styles.bulletText}>
            {item}
          </Text>
        </Animated.View>
      ))}
    </View>
  );
});

export const SmartSummaryTab = memo(function SmartSummaryTab({
  sessionResult,
}: SmartSummaryTabProps) {
  const { whatWorkedWell, overallTakeaways } = sessionResult.smartSummary;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text variant="l" weight="semiBold" color={palette.gray80} style={styles.sectionTitle}>
          What worked well
        </Text>
        <BulletList
          items={whatWorkedWell}
          emptyMessage="No specific points recorded for what worked well."
        />
      </View>

      <View style={styles.section}>
        <Text variant="l" weight="semiBold" color={palette.gray80} style={styles.sectionTitle}>
          Overall takeaways
        </Text>
        <BulletList
          items={overallTakeaways}
          emptyMessage="No overall takeaways recorded for this session."
        />
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
  section: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    marginBottom: spacing.m,
  },
  listContainer: {
    gap: spacing.m,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.xs,
  },
  diamondWrapper: {
    width: 14,
    height: 22, // Match bulletText lineHeight exactly
    alignItems: "center",
    justifyContent: "center",
  },
  diamond: {
    width: 5,
    height: 5,
    backgroundColor: palette.gray40,
    transform: [{ rotate: "45deg" }],
  },
  bulletText: {
    flex: 1,
    lineHeight: 22,
    paddingLeft: spacing.xxs,
  },
  emptyText: {
    fontStyle: "italic",
    paddingLeft: spacing.m,
  },
});
