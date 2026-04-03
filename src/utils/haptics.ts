import * as Haptics from "expo-haptics";

export type HapticFeedbackType = "light" | "medium" | "heavy" | "success" | "warning" | "error";

/**
 * Trigger haptic feedback. Safe to call — silently fails if haptics unavailable.
 */
export async function triggerHaptics(type: HapticFeedbackType): Promise<void> {
  try {
    switch (type) {
      case "light":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case "medium":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case "heavy":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case "success":
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case "warning":
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case "error":
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
    }
  } catch {
    // Haptics not available (web, some simulators) — fail silently
  }
}

export const hapticTap = () => triggerHaptics("light");
export const hapticSelect = () => triggerHaptics("medium");
export const hapticHeavy = () => triggerHaptics("heavy");
export const hapticSuccess = () => triggerHaptics("success");
export const hapticError = () => triggerHaptics("error");
