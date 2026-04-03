import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { colors, palette } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import type { SessionResult } from "@/types";

export interface SessionHeaderProps {
  sessionResult: SessionResult;
  onClose?: () => void;
}

export function SessionHeader({ sessionResult, onClose }: SessionHeaderProps) {
  const insets = useSafeAreaInsets();

  const handleClose = () => {
    onClose?.();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.m }]}>
      <TouchableOpacity
        style={[styles.closeButton, { top: insets.top + spacing.xs }]}
        onPress={handleClose}
      >
        <View style={styles.closeIconWrapper}>
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </View>
      </TouchableOpacity>

      <View style={styles.avatarsContainer}>
        <Image
          source={require("@/../assets/avatar1.png")}
          style={styles.avatar}
          cachePolicy="memory-disk"
          transition={200}
        />
        <Image
          source={require("@/../assets/avatar2.png")}
          style={[styles.avatar, styles.avatarOverlap]}
          cachePolicy="memory-disk"
          transition={200}
        />
      </View>

      <View style={styles.triangle} />

      <View style={styles.card}>
        <Text
          variant="m"
          weight="semiBold"
          color={colors.textInverse}
          align="center"
          style={styles.questionText}
        >
          {sessionResult.questionText}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.companyLogoWrapper}>
            <Image
              source={{ uri: sessionResult.companyLogoUrl }}
              style={styles.companyLogo}
              cachePolicy="memory-disk"
            />
          </View>
          <Text weight="medium" color={colors.textInverse} style={styles.footerText}>
            Asked by {sessionResult.companyName}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundFeedback,
    paddingHorizontal: spacing.screenPadding,
    alignItems: "center",
    paddingBottom: spacing.xl,
  },
  closeButton: {
    position: "absolute",
    right: spacing.screenPadding,
    zIndex: 10,
  },
  closeIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.green30,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarsContainer: {
    flexDirection: "row",
    marginBottom: spacing.xs,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  avatarOverlap: {
    marginLeft: -20,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: colors.success, // palette.green50
    transform: [{ rotate: "0deg" }],
    zIndex: 1,
    marginBottom: -1,
  },
  card: {
    backgroundColor: colors.success, // palette.green50
    borderRadius: 20,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    width: "100%",
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  questionText: {
    alignSelf: "stretch",
    lineHeight: 22,
    marginBottom: spacing.s,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  companyLogoWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: palette.white,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  companyLogo: {
    width: 16,
    height: 16,
  },
  footerText: {
    fontSize: 12,
  },
});
