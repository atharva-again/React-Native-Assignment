import BottomSheet, {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import type { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import type { Question } from "@/types";

export interface QuestionBottomSheetProps {
  question: Question | null;
  onClose: () => void;
  onChange?: (index: number) => void;
  backdropComponent?: (props: BottomSheetBackdropProps) => React.ReactElement;
}

export const QuestionBottomSheet = React.forwardRef<BottomSheet, QuestionBottomSheetProps>(
  ({ question, onClose, onChange, backdropComponent }, ref) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const snapPoints = useMemo(() => ["50%", "65%"], []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
      ),
      [],
    );

    const handleFeedbackPress = () => {
      if (!question) return;
      onClose();
      navigation.navigate("SessionResult", {
        questionId: question.id,
        isCorrect: true,
        score: 85,
      });
    };

    if (!question) return null;

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={onClose}
        onChange={onChange}
        backdropComponent={backdropComponent ?? renderBackdrop}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.indicator}
      >
        <BottomSheetView style={styles.content}>
          <View style={styles.header}>
            <Image
              source={{ uri: question.companyLogoUrl }}
              style={styles.logo}
              contentFit="contain"
              cachePolicy="memory-disk"
              transition={200}
            />
            <Text variant="s" weight="medium" color={colors.textSecondary}>
              Asked by {question.companyName}
            </Text>
          </View>

          <Text variant="l" weight="bold" style={styles.questionText}>
            {question.text}
          </Text>

          <View style={styles.durationContainer}>
            <Text variant="s" color={colors.textSecondary}>
              Session duration estimate:
            </Text>
            <Text variant="s" weight="bold" color={colors.textPrimary}>
              {" "}
              {question.durationMinutes} mins
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="FEEDBACK" onPress={handleFeedbackPress} style={styles.button} />
            <Button title="AI VS AI (LISTEN)" variant="disabled" disabled style={styles.button} />
          </View>

          <Text variant="xs" align="center" color={colors.textSecondary} style={styles.socialProof}>
            {question.completedTodayCount.toLocaleString()} users completed Question{" "}
            {question.questionNumber} today
          </Text>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

QuestionBottomSheet.displayName = "QuestionBottomSheet";

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.background,
  },
  indicator: {
    backgroundColor: colors.border,
    width: 40,
  },
  content: {
    padding: spacing.screenPadding,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.m,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: spacing.s,
    borderRadius: 4,
  },
  questionText: {
    marginBottom: spacing.l,
    lineHeight: 28,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  buttonContainer: {
    gap: spacing.m,
    marginBottom: spacing.l,
  },
  button: {
    width: "100%",
  },
  socialProof: {
    marginTop: "auto",
    paddingBottom: spacing.m,
  },
});
