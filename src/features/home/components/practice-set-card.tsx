import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/text";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export interface PracticeSetCardProps {
  title: string;
  onPress?: () => void;
}

export function PracticeSetCard({ title, onPress }: PracticeSetCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open practice set details: ${title}`}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <View style={styles.content}>
        <Text variant="s" weight="medium" color={colors.textSecondary} style={styles.label}>
          CURRENTLY PRACTICING
        </Text>
        <Text variant="l" weight="bold" color={colors.textPrimary}>
          {title}
        </Text>
      </View>
      <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardRadius,
    padding: spacing.m,
    marginBottom: spacing.l,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    flex: 1,
    marginRight: spacing.m,
  },
  label: {
    marginBottom: spacing.xs,
    letterSpacing: 0.5,
  },
});
