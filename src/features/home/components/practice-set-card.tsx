import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/text";
import { colors, palette } from "@/theme";
import { spacing } from "@/theme/spacing";

export interface PracticeSetCardProps {
  title: string;
  onPress?: () => void;
}

export function PracticeSetCard({ title, onPress }: PracticeSetCardProps) {
  return (
    <View style={styles.shadowContainer}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.9}
        onPress={onPress}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <View style={styles.leftContent}>
          <View style={styles.iconContainer}>
            <Text style={styles.muscleIcon}>💪</Text>
          </View>
          <View style={styles.textContainer}>
            <Text variant="xs" color={palette.textDark} style={styles.label}>
              Practicing Top 50 Questions for
            </Text>
            <Text variant="m" weight="bold" color={palette.textDark} style={styles.title}>
              {title.replace("Practicing Top 50 Questions for ", "")}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-down" size={24} color={palette.textDark} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    backgroundColor: palette.badgeGold,
    borderRadius: 24,
    paddingBottom: 4,
    marginBottom: spacing.l,
  },
  container: {
    backgroundColor: colors.bannerYellow,
    borderRadius: 20,
    padding: spacing.s,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.s,
  },
  muscleIcon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    lineHeight: 16,
    opacity: 0.8,
  },
  title: {
    lineHeight: 22,
  },
});
