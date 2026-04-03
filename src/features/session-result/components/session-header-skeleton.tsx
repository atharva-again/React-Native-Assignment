import { StyleSheet, View } from "react-native";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export function SessionHeaderSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarsContainer}>
        <Skeleton width={60} height={60} borderRadius={30} style={styles.avatar} />
        <Skeleton
          width={60}
          height={60}
          borderRadius={30}
          style={[styles.avatar, styles.avatarOverlap]}
        />
      </View>

      <SkeletonCard style={styles.card}>
        <View style={styles.cardHeader}>
          <Skeleton width={80} height={16} borderRadius={4} />
        </View>
        <Skeleton width="100%" height={20} borderRadius={4} style={styles.textLine} />
        <Skeleton width="80%" height={20} borderRadius={4} />
      </SkeletonCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenPadding,
    alignItems: "center",
    paddingVertical: spacing.l,
  },
  avatarsContainer: {
    flexDirection: "row",
    marginBottom: spacing.l,
  },
  avatar: {
    borderWidth: 2,
    borderColor: colors.background,
  },
  avatarOverlap: {
    marginLeft: -20,
  },
  card: {
    width: "100%",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  textLine: {
    marginBottom: spacing.xs,
  },
});
