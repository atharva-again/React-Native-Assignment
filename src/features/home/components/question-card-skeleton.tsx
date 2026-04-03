import { StyleSheet, View } from "react-native";
import { Skeleton } from "@/components/ui/skeleton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export function QuestionCardSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <Skeleton width={24} height={24} borderRadius={4} style={styles.logo} />
          <Skeleton width={80} height={16} borderRadius={4} />
        </View>
        <Skeleton width={24} height={24} borderRadius={12} />
      </View>

      <Skeleton width="100%" height={20} borderRadius={4} style={styles.questionText} />
      <Skeleton width="80%" height={20} borderRadius={4} style={styles.questionText} />

      <View style={styles.footer}>
        <Skeleton width={150} height={14} borderRadius={4} />
      </View>
    </View>
  );
}

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
    marginRight: spacing.xs,
  },
  questionText: {
    marginBottom: spacing.xs,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.s,
  },
});
