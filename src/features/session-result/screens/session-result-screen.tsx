import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import type { RootStackParamList } from "@/navigation/types";
import { colors, palette, spacing } from "@/theme";
import type { SessionResult } from "@/types";
import { hapticTap } from "@/utils/haptics";
import { loadSessionResult } from "@/utils/mock-data";
import { KeyMomentsTab } from "../components/key-moments-tab";
import { SessionHeader } from "../components/session-header";
import { SmartSummaryTab } from "../components/smart-summary-tab";

type TabType = "summary" | "highlights";

export function SessionResultScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "SessionResult">) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>("summary");

  const sessionResult: SessionResult = loadSessionResult();

  const handleClose = () => {
    navigation.goBack();
  };

  const handleTabPress = async (tab: TabType) => {
    if (activeTab !== tab) {
      await hapticTap();
      setActiveTab(tab);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(400)}>
        <SessionHeader sessionResult={sessionResult} onClose={handleClose} />
      </Animated.View>

      <Animated.View style={styles.sheet} entering={FadeInDown.duration(500).delay(100)}>
        <View style={styles.tabBar} role="tablist">
          <TouchableOpacity
            style={[styles.tabItem, activeTab === "summary" && styles.activeTabItem]}
            onPress={() => handleTabPress("summary")}
            role="tab"
            accessibilityRole="tab"
            accessibilityLabel="Smart summary tab"
            accessibilityState={{ selected: activeTab === "summary" }}
          >
            <Text
              variant="m"
              weight={activeTab === "summary" ? "semiBold" : "normal"}
              color={activeTab === "summary" ? palette.gray80 : palette.gray50}
            >
              Smart summary
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === "highlights" && styles.activeTabItem]}
            onPress={() => handleTabPress("highlights")}
            role="tab"
            accessibilityRole="tab"
            accessibilityLabel="Key moments tab"
            accessibilityState={{ selected: activeTab === "highlights" }}
          >
            <Text
              variant="m"
              weight={activeTab === "highlights" ? "semiBold" : "normal"}
              color={activeTab === "highlights" ? palette.gray80 : palette.gray50}
            >
              Key moments
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {activeTab === "summary" ? (
            <SmartSummaryTab sessionResult={sessionResult} />
          ) : (
            <KeyMomentsTab sessionResult={sessionResult} />
          )}
        </View>
      </Animated.View>

      <View style={{ height: insets.bottom, backgroundColor: colors.background }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundFeedback,
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -20,
    overflow: "hidden",
  },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: palette.gray20,
    paddingTop: spacing.s,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.m,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTabItem: {
    borderBottomColor: palette.gray80,
  },
  content: {
    flex: 1,
  },
});
