import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { AnimatedScreen, GradientButton, IconButton, ScreenContainer, Text } from "@/components/ui";
import { colors, palette, spacing } from "@/theme";

export function SettingsScreen() {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScreenContainer withPadding={false} style={styles.container}>
      <AnimatedScreen>
        {/* Header */}
        <View style={styles.header}>
          <IconButton
            name="chevron-back"
            size={24}
            onPress={handleBack}
            accessibilityLabel="Go back"
          />
          <Text variant="xl" weight="semiBold" style={styles.headerTitle}>
            Your Profile
          </Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Trial Card */}
          <View style={styles.trialCard}>
            <View style={styles.trialContent}>
              <View style={styles.trialTextContainer}>
                <Text variant="m" weight="medium" color={colors.textInverse}>
                  3 days free trial for
                </Text>
                <Text
                  variant="xxxl"
                  weight="bold"
                  color={colors.cardYellow}
                  style={styles.trialPrice}
                >
                  ₹1
                </Text>
                <Text variant="s" color={colors.textInverse} style={styles.trialSubtext}>
                  Then ₹299/month
                </Text>
              </View>
              <Image
                source={require("@/../assets/trial_illustration.png")}
                style={styles.trialImage}
                resizeMode="contain"
              />
            </View>
            <GradientButton
              label="START 3 DAYS TRIAL @ ₹1"
              colors={[palette.bannerYellow, palette.cardYellow]}
              textColor={palette.orange70}
              fullWidth
              style={styles.trialButton}
            />
          </View>

          {/* Update Card */}
          <View style={styles.updateCard}>
            <View style={styles.updateLeft}>
              <View style={styles.updateIconContainer}>
                <Ionicons name="grid-outline" size={20} color={colors.textPrimary} />
              </View>
              <Text variant="m" weight="medium">
                New update available
              </Text>
            </View>
            <TouchableOpacity style={styles.downloadButton}>
              <Ionicons name="download-outline" size={20} color={colors.iconGreen} />
            </TouchableOpacity>
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Ionicons name="call-outline" size={20} color={colors.textSecondary} />
                <Text variant="m" style={styles.infoLabel}>
                  Phone number
                </Text>
              </View>
              <Text variant="m" color={colors.textSecondary}>
                +91 9608184703
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Ionicons name="add-circle-outline" size={20} color={colors.textSecondary} />
                <Text variant="m" style={styles.infoLabel}>
                  Learning since
                </Text>
              </View>
              <Text variant="m" color={colors.textSecondary}>
                August 17, 2025
              </Text>
            </View>
          </View>

          {/* Menu Section */}
          <View style={styles.menuSection}>
            <MenuItem icon="chatbubble-outline" title="Chat with us" />
            <View style={styles.divider} />
            <MenuItem icon="share-outline" title="Share the app" />
            <View style={styles.divider} />
            <MenuItem icon="star-outline" title="Rate the app" />
            <View style={styles.divider} />
            <MenuItem icon="log-out-outline" title="Log out" />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text variant="s" color={colors.textDisabled} align="center">
              App version v2.14.2
            </Text>
            <Text
              variant="s"
              color={colors.textDisabled}
              align="center"
              style={styles.footerBottom}
            >
              Made with ❤️ from India
            </Text>
          </View>
        </ScrollView>
      </AnimatedScreen>
    </ScreenContainer>
  );
}

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
}

function MenuItem({ icon, title }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon} size={20} color={colors.textSecondary} />
        <Text variant="m" style={styles.menuItemTitle}>
          {title}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textDisabled} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceMuted,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.s,
    paddingTop: spacing.s,
    paddingBottom: spacing.m,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
  },
  headerPlaceholder: {
    width: 44, // Match IconButton size
  },
  scrollContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.xxxl,
  },
  trialCard: {
    backgroundColor: colors.textDarkAlt,
    borderRadius: 24,
    padding: spacing.l,
    marginBottom: spacing.m,
    overflow: "hidden",
  },
  trialContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.l,
  },
  trialTextContainer: {
    flex: 1,
  },
  trialPrice: {
    fontSize: 48,
    lineHeight: 56,
    marginTop: spacing.xs,
  },
  trialSubtext: {
    marginTop: spacing.xxs,
  },
  trialImage: {
    width: 330,
    height: 280,
    position: "absolute",
    right: -90,
    bottom: -100, // Move it further down and right
  },
  trialButton: {
    alignSelf: "stretch",
    width: "100%",
    borderRadius: spacing.buttonRadius,
    elevation: 4,
    shadowColor: palette.orange70,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  updateCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: palette.white,
    padding: spacing.m,
    borderRadius: spacing.cardRadius,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    marginBottom: spacing.m,
  },
  updateLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  updateIconContainer: {
    marginRight: spacing.m,
  },
  downloadButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceSuccessTint,
    justifyContent: "center",
    alignItems: "center",
  },
  infoSection: {
    backgroundColor: palette.white,
    borderRadius: spacing.cardRadius,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    paddingHorizontal: spacing.m,
    marginBottom: spacing.m,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.m,
  },
  infoLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoLabel: {
    marginLeft: spacing.m,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceDivider,
  },
  menuSection: {
    backgroundColor: palette.white,
    borderRadius: spacing.cardRadius,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    paddingHorizontal: spacing.m,
    marginBottom: spacing.xxl,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.m,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemTitle: {
    marginLeft: spacing.m,
  },
  footer: {
    marginTop: spacing.m,
    marginBottom: spacing.xxxl,
  },
  footerBottom: {
    marginTop: spacing.xxs,
  },
});
