import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/text";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import type { SessionResult } from "@/types";

export interface SessionHeaderProps {
  sessionResult: SessionResult;
}

export function SessionHeader({ sessionResult }: SessionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarsContainer}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=32" }}
          style={styles.avatar}
          cachePolicy="memory-disk"
          transition={200}
          accessibilityLabel="Coach avatar"
        />
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=44" }}
          style={[styles.avatar, styles.avatarOverlap]}
          cachePolicy="memory-disk"
          transition={200}
          accessibilityLabel="Your avatar"
        />
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Image
            source={{ uri: sessionResult.companyLogoUrl }}
            style={styles.companyLogo}
            cachePolicy="memory-disk"
          />
          <Text variant="s" weight="medium" color={colors.textSecondary}>
            {sessionResult.companyName}
          </Text>
        </View>
        <Text variant="m" weight="semiBold" numberOfLines={2}>
          {sessionResult.questionText}
        </Text>
      </View>
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
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.background,
    backgroundColor: colors.border,
  },
  avatarOverlap: {
    marginLeft: -20,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardRadius,
    padding: spacing.m,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  companyLogo: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
});
