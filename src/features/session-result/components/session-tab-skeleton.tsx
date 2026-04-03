import { StyleSheet, View } from "react-native";
import { Skeleton } from "@/components/ui/skeleton";
import { spacing } from "@/theme/spacing";

export function SessionTabSkeleton() {
  return (
    <View style={styles.container}>
      <Skeleton width={150} height={24} borderRadius={4} style={styles.title} />

      <View style={styles.section}>
        <Skeleton width={120} height={20} borderRadius={4} style={styles.sectionTitle} />
        <Skeleton width="100%" height={16} borderRadius={4} style={styles.line} />
        <Skeleton width="90%" height={16} borderRadius={4} style={styles.line} />
        <Skeleton width="95%" height={16} borderRadius={4} style={styles.line} />
      </View>

      <View style={styles.section}>
        <Skeleton width={140} height={20} borderRadius={4} style={styles.sectionTitle} />
        <Skeleton width="100%" height={16} borderRadius={4} style={styles.line} />
        <Skeleton width="85%" height={16} borderRadius={4} style={styles.line} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  line: {
    marginBottom: spacing.s,
  },
});
