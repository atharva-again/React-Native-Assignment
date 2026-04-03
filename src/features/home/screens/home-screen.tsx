import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useCallback, useMemo, useState } from "react";
import { Text as RNText, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedScreen } from "@/components/ui";
import { PracticeSetCard } from "@/features/home/components/practice-set-card";
import { QuestionCard } from "@/features/home/components/question-card";
import { colors, palette } from "@/theme";
import { spacing } from "@/theme/spacing";
import type { Question } from "@/types";
import { loadQuestions } from "@/utils/mock-data";

export function HomeScreen() {
  const questions = useMemo(() => loadQuestions(), []);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  const handleCardPress = useCallback((question: Question) => {
    setSelectedQuestionId((current) => (current === question.id ? null : question.id));
  }, []);

  const handleEnergyPress = () => {};

  const handleMenuPress = () => {};

  const renderItem = useCallback(
    ({ item, index }: { item: Question; index: number }) => (
      <QuestionCard
        question={item}
        index={index}
        onPress={() => handleCardPress(item)}
        isSelected={selectedQuestionId === item.id}
      />
    ),
    [handleCardPress, selectedQuestionId],
  );

  const keyExtractor = useCallback((item: Question) => item.id, []);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <AnimatedScreen>
        <View style={styles.header}>
          <Image
            source={require("../../../../assets/icon.png")}
            style={styles.logo}
            contentFit="contain"
          />
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.energyPill}
              activeOpacity={0.7}
              onPress={handleEnergyPress}
            >
              <Ionicons name="flash" size={18} color={palette.white} />
              <RNText style={styles.energyCount}>8</RNText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              activeOpacity={0.7}
              onPress={handleMenuPress}
            >
              <Ionicons name="menu" size={24} color={palette.textDark} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <PracticeSetCard title="Practicing Top 50 Questions for Big Tech Companies" />

          <View style={{ flex: 1 }}>
            <FlashList
              data={questions}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              // @ts-expect-error - estimatedItemSize is required by FlashList but causing type mismatch in this environment
              estimatedItemSize={120}
            />
          </View>
        </View>
      </AnimatedScreen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.s,
  },
  logo: {
    width: 80,
    height: 32,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.s,
  },
  energyPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.success,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    gap: 4,
  },
  energyCount: {
    color: palette.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: palette.gray20,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
  },
  listContent: {
    paddingBottom: 150,
  },
});
