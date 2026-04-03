import { useCallback, useEffect, useRef, useState } from "react";
import {
  type NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  type TextInputKeyPressEventData,
  View,
} from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { hapticTap } from "@/utils/haptics";

export interface OtpInputProps {
  length?: number;
  value: string;
  onChangeValue: (value: string) => void;
  error?: boolean;
  onRef?: (ref: { blur: () => void }) => void;
  accessibilityLabel?: string;
}

export function OtpInput({
  length = 4,
  value,
  onChangeValue,
  error = false,
  onRef,
  accessibilityLabel: customA11yLabel,
}: OtpInputProps) {
  const refs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const blurAll = useCallback(() => {
    refs.current.forEach((input) => {
      input?.blur();
    });
    setFocusedIndex(-1);
  }, []);

  useEffect(() => {
    onRef?.({ blur: blurAll });
  }, [onRef, blurAll]);

  const handleChangeText = useCallback(
    async (text: string, index: number) => {
      if (text.length > 1) {
        const digits = text.replace(/\D/g, "").slice(0, length);
        onChangeValue(digits);
        const nextIndex = Math.min(digits.length, length) - 1;
        refs.current[nextIndex]?.focus();
        await hapticTap();
        return;
      }

      const digits = value.split("");
      digits[index] = text;
      const newValue = digits.join("").slice(0, length);
      onChangeValue(newValue);

      if (text.length > 0) {
        await hapticTap();
      }

      if (text.length > 0 && index < length - 1) {
        refs.current[index + 1]?.focus();
      }
    },
    [value, length, onChangeValue],
  );

  const handleKeyPress = useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
      if (e.nativeEvent.key === "Backspace") {
        const digits = value.split("");
        if (digits[index] === "" && index > 0) {
          refs.current[index - 1]?.focus();
          const newDigits = [...digits];
          newDigits[index - 1] = "";
          onChangeValue(newDigits.join(""));
        } else {
          digits[index] = "";
          onChangeValue(digits.join(""));
        }
      }
    },
    [value, onChangeValue],
  );

  const handleFocus = useCallback((index: number) => {
    setFocusedIndex(index);
  }, []);

  const paddedValue = value.padEnd(length, "").slice(0, length);
  const boxes = Array.from({ length }, (_, i) => i);

  return (
    <View style={styles.container} accessible accessibilityLabel={customA11yLabel ?? "OTP input"}>
      {boxes.map((index) => {
        const isFocused = focusedIndex === index;
        const hasValue = paddedValue[index] !== "";

        return (
          <TextInput
            key={index}
            ref={(el) => {
              refs.current[index] = el;
            }}
            style={[
              styles.box,
              isFocused && styles.boxFocused,
              error && styles.boxError,
              hasValue && styles.boxFilled,
            ]}
            keyboardType="number-pad"
            maxLength={length}
            value={paddedValue[index] || ""}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => handleFocus(index)}
            placeholderTextColor={colors.textDisabled}
            textAlign="center"
            accessibilityLabel={`Digit ${index + 1}`}
            accessibilityRole="text"
            accessibilityState={{ selected: isFocused }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: spacing.s,
  },
  box: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.inputRadius,
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.inter.semiBold,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  boxFocused: {
    borderColor: colors.borderFocused,
  },
  boxError: {
    borderColor: colors.error,
  },
  boxFilled: {
    backgroundColor: colors.backgroundSecondary,
  },
});
