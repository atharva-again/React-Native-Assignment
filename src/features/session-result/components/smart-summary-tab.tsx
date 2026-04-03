import { memo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/text";
import { colors } from "@/theme/colors";
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
        // biome-ignore lint/suspicious/noArrayIndexKey: items are static strings
        <View key={index} style={styles.bulletItem}>
          <View style={styles.bulletMarker} />
          <Text variant="m" style={styles.bulletText}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
});

export const SmartSummaryTab = memo(function SmartSummaryTab({
  sessionResult,
}: SmartSummaryTabProps) {
  const { whatWorkedWell, overallTakeaways } = sessionResult.smartSummary;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="l" weight="bold" style={styles.title}>
        Smart Summary
      </Text>

      <View style={styles.section}>
        <Text variant="m" weight="semiBold" style={styles.sectionTitle}>
          What worked well
        </Text>
        <BulletList
          items={whatWorkedWell}
          emptyMessage="No specific points recorded for what worked well."
        />
      </View>

      <View style={styles.section}>
        <Text variant="m" weight="semiBold" style={styles.sectionTitle}>
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
  },
  content: {
    padding: spacing.screenPadding,
  },
  title: {
    marginBottom: spacing.l,
  },
  section: {
    marginBottom: spacing.xl,
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
  },
  bulletMarker: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 8,
    marginRight: spacing.s,
  },
  bulletText: {
    flex: 1,
    lineHeight: 22,
  },
  emptyText: {
    fontStyle: "italic",
  },
});
