import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { Text } from "./text";

const COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸", label: "US" },
  { code: "+91", flag: "🇮🇳", label: "IN" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+61", flag: "🇦🇺", label: "AU" },
  { code: "+81", flag: "🇯🇵", label: "JP" },
] as const;

export interface PhoneInputProps {
  value: string;
  onChangeValue: (value: string) => void;
  selectedCountryCode: string;
  onCountryCodeChange: (code: string) => void;
  error?: boolean;
  errorText?: string;
  label?: string;
  onFocus?: () => void;
}

export function PhoneInput({
  value,
  onChangeValue,
  selectedCountryCode,
  onCountryCodeChange,
  error,
  errorText,
  label,
  onFocus,
}: PhoneInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const selected = COUNTRY_CODES.find((c) => c.code === selectedCountryCode) ?? COUNTRY_CODES[0];

  const getBorderColor = () => {
    if (error) return colors.error;
    if (isFocused) return colors.borderFocused;
    return colors.border;
  };

  return (
    <>
      {label && (
        <Text variant="s" weight="medium" style={styles.label}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.container,
          {
            borderColor: getBorderColor(),
          },
        ]}
      >
        <TouchableOpacity
          style={styles.countryCode}
          onPress={() => setShowPicker(true)}
          activeOpacity={0.7}
        >
          <Text variant="m" weight="semiBold" style={styles.countryCodeText}>
            {selected.flag} {selected.code}
          </Text>
          <Ionicons name="chevron-down" size={14} color={colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeValue}
          keyboardType="phone-pad"
          placeholder="Enter mobile number"
          placeholderTextColor={colors.textDisabled}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => setIsFocused(false)}
        />
      </View>

      {error && errorText && (
        <Text variant="xs" color={colors.error} style={styles.errorText}>
          {errorText}
        </Text>
      )}

      <Modal visible={showPicker} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPicker(false)}
        >
          <View style={styles.pickerContainer}>
            {COUNTRY_CODES.map((country) => (
              <TouchableOpacity
                key={country.code}
                style={[
                  styles.pickerRow,
                  country.code === selectedCountryCode && styles.pickerRowSelected,
                ]}
                onPress={() => {
                  onCountryCodeChange(country.code);
                  setShowPicker(false);
                }}
              >
                <Text
                  variant="m"
                  weight={country.code === selectedCountryCode ? "semiBold" : "normal"}
                >
                  {country.flag} {country.code}
                </Text>
                {country.code === selectedCountryCode && (
                  <Ionicons name="checkmark" size={18} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: spacing.xxs,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: spacing.inputRadius,
    backgroundColor: colors.background,
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
    paddingHorizontal: spacing.s,
    paddingVertical: Platform.OS === "ios" ? spacing.m : spacing.s,
  },
  countryCodeText: {
    color: colors.textPrimary,
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.m,
    paddingVertical: Platform.OS === "ios" ? spacing.m : spacing.s,
    fontSize: typography.sizes.m,
    fontFamily: typography.fonts.inter.normal,
    color: colors.textPrimary,
  },
  errorText: {
    marginTop: spacing.xxs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    backgroundColor: colors.background,
    borderRadius: spacing.cardRadius,
    paddingVertical: spacing.xs,
    width: "70%",
    ...Platform.select({
      ios: {
        shadowColor: colors.textPrimary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
  },
  pickerRowSelected: {
    backgroundColor: colors.primaryLight,
  },
});
