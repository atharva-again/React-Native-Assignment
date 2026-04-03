import { useState } from "react";
import { Platform, StyleSheet, TextInput, type TextInputProps, View } from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { formFieldStyles, getFieldBorderColor } from "./form-field";
import { Text } from "./text";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
}

export function Input({
  label,
  error,
  errorText,
  disabled,
  style,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: Parameters<NonNullable<TextInputProps["onFocus"]>>[0]) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: Parameters<NonNullable<TextInputProps["onBlur"]>>[0]) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text
          variant="s"
          weight="medium"
          color={disabled ? colors.textDisabled : colors.textPrimary}
          style={formFieldStyles.label}
        >
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            borderColor: getFieldBorderColor(error, isFocused),
            color: disabled ? colors.textDisabled : colors.textPrimary,
            backgroundColor: disabled ? colors.backgroundSecondary : colors.background,
          },
          style,
        ]}
        placeholderTextColor={colors.textDisabled}
        editable={!disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {error && errorText && (
        <Text variant="xs" color={colors.error} style={formFieldStyles.errorText}>
          {errorText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: spacing.xs,
  },
  input: {
    ...formFieldStyles.inputBase,
    paddingVertical: Platform.OS === "ios" ? spacing.m : spacing.s,
  },
});
