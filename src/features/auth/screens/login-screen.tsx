import { useCallback, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AuthScreenLayout, GradientButton, OtpInput, PhoneInput, Text } from "@/components/ui";
import type { AuthStackScreenProps } from "@/navigation/types";
import { colors, spacing, typography } from "@/theme";

const PHONE_MIN_LENGTH = 10;
const OTP_LENGTH = 6;

type ButtonState = "get-otp" | "otp-sent" | "continue";

function LoginScreen({ navigation }: AuthStackScreenProps<"Login">) {
  const otpRef = useRef<{ blur: () => void }>(null);

  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [buttonState, setButtonState] = useState<ButtonState>("get-otp");
  const [resendTimer, setResendTimer] = useState(0);

  const isPhoneValid = phone.replace(/\D/g, "").length >= PHONE_MIN_LENGTH;
  const isOtpValid = otp.length === OTP_LENGTH;

  const handlePhoneChange = useCallback((value: string) => {
    setPhone(value.replace(/[^\d]/g, ""));
    setPhoneError("");
    if (value.replace(/[^\d]/g, "").length >= PHONE_MIN_LENGTH) {
      Keyboard.dismiss();
    }
  }, []);

  const handleOtpChange = useCallback(
    (value: string) => {
      setOtp(value.replace(/[^\d]/g, ""));
      if (value.replace(/[^\d]/g, "").length >= OTP_LENGTH) {
        Keyboard.dismiss();
        if (buttonState === "otp-sent") {
          setButtonState("continue");
        }
      }
    },
    [buttonState],
  );

  const handlePhoneFocus = useCallback(() => {
    otpRef.current?.blur();
  }, []);

  const handleGetOtp = useCallback(() => {
    if (!isPhoneValid) {
      setPhoneError(`Please enter a valid ${PHONE_MIN_LENGTH}-digit mobile number`);
      return;
    }
    setButtonState("otp-sent");
    setResendTimer(15);
  }, [isPhoneValid]);

  const handleResend = useCallback(() => {
    setButtonState("otp-sent");
    setResendTimer(15);
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [resendTimer]);

  const handleContinue = useCallback(() => {
    if (!isOtpValid) return;
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: "Main" as never }],
    });
  }, [isOtpValid, navigation]);

  const handleButtonPress = useCallback(() => {
    if (buttonState === "get-otp") {
      handleGetOtp();
    } else if (buttonState === "continue") {
      handleContinue();
    }
  }, [buttonState, handleGetOtp, handleContinue]);

  const buttonLabel =
    buttonState === "get-otp" ? "Get OTP" : buttonState === "otp-sent" ? "OTP Sent" : "Continue";

  const isButtonDisabled =
    buttonState === "get-otp" ? !isPhoneValid : buttonState === "continue" ? !isOtpValid : true;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <AuthScreenLayout>
        <View style={styles.topSpacer} />

        <View style={styles.content}>
          <View style={styles.headingRow}>
            <Text style={styles.headingPrimary}>Kickstart </Text>
            <Text style={styles.headingBlack}>your journey</Text>
          </View>

          <Text variant="m" color={colors.textSecondary} style={styles.subtitle}>
            We will send you an OTP to verify your number.
          </Text>

          <View style={styles.spacer} />

          <PhoneInput
            value={phone}
            onChangeValue={handlePhoneChange}
            selectedCountryCode={countryCode}
            onCountryCodeChange={setCountryCode}
            label="Phone Number"
            error={!!phoneError}
            errorText={phoneError}
            onFocus={handlePhoneFocus}
          />

          <Text variant="xs" color={colors.textSecondary} style={styles.helperText}>
            Please enter a valid {PHONE_MIN_LENGTH}-digit mobile number
          </Text>

          <View style={styles.otpGap} />

          <View style={styles.otpSection}>
            <Text variant="s" weight="medium" style={styles.otpLabel}>
              Enter the OTP
            </Text>
            <OtpInput
              onRef={(ref) => {
                otpRef.current = ref;
              }}
              length={OTP_LENGTH}
              value={otp}
              onChangeValue={handleOtpChange}
            />
            {buttonState !== "get-otp" && (
              <TouchableOpacity
                onPress={resendTimer === 0 ? handleResend : undefined}
                style={styles.resendButton}
                disabled={resendTimer > 0}
              >
                <Text variant="s" weight="semiBold" style={styles.resendText}>
                  {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <GradientButton
            label={buttonLabel}
            onPress={handleButtonPress}
            disabled={isButtonDisabled}
            style={isButtonDisabled && styles.buttonDisabled}
          />
        </View>
      </AuthScreenLayout>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
  },
  headingRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  headingPrimary: {
    fontSize: 28,
    fontFamily: typography.fonts.inter.bold,
    color: colors.primary,
  },
  headingBlack: {
    fontSize: 28,
    fontFamily: typography.fonts.inter.bold,
    color: colors.textPrimary,
  },
  topSpacer: {
    height: spacing.giga,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  spacer: {
    height: spacing.xxl,
  },
  helperText: {
    marginTop: spacing.xs,
  },
  otpGap: {
    height: spacing.xl,
  },
  otpSection: {
    gap: spacing.xs,
  },
  otpLabel: {
    color: colors.textPrimary,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonContainer: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.xxxl,
  },
  resendButton: {
    marginTop: spacing.s,
  },
  resendText: {
    color: colors.primary,
  },
});

export default LoginScreen;
