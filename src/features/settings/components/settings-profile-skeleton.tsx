import { StyleSheet, View } from "react-native";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export function SettingsProfileSkeleton() {
  return (
    <SkeletonCard style={styles.profileSection}>
      <Skeleton width={64} height={64} borderRadius={32} style={styles.avatar} />
      <View style={styles.profileInfo}>
        <Skeleton width={120} height={20} borderRadius={4} style={styles.name} />
        <Skeleton width={100} height={16} borderRadius={4} />
      </View>
    </SkeletonCard>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.m,
  },
  avatar: {
    backgroundColor: colors.border,
  },
  profileInfo: {
    marginLeft: spacing.m,
  },
  name: {
    marginBottom: spacing.xs,
  },
});
