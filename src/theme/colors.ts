/**
 * ReadyU Brand Color Palette
 *
 * Use these color tokens throughout your components.
 * Do NOT use hardcoded hex values in component files.
 */

export const palette = {
  // Brand
  orange10: "#FFF7ED",
  orange20: "#FFEDD5",
  orange30: "#FED7AA",
  orange40: "#FB923C",
  orange50: "#F97316",
  orange60: "#EA580C",
  orange70: "#C2410C",

  // Greens (used on Feedback / Highlights screens)
  green10: "#F0FDF4",
  green20: "#DCFCE7",
  green30: "#86EFAC",
  green40: "#4ADE80",
  green50: "#22C55E",
  green60: "#16A34A",

  // Grays
  gray10: "#F9FAFB",
  gray20: "#F3F4F6",
  gray30: "#E5E7EB",
  gray40: "#D1D5DB",
  gray50: "#9CA3AF",
  gray60: "#6B7280",
  gray70: "#4B5563",
  gray80: "#374151",
  gray90: "#1F2937",

  // Figma card colors
  cardGreen: "#D8F7C2",
  cardGreenDark: "#94DE5F",
  cardGreenDarker: "#79D634",
  cardOrange: "#FFF0BF",
  cardYellow: "#FFEAA6",
  cardGray: "#EFEFF4",
  bannerYellow: "#FFF6D9",
  badgeGold: "#BF9C26",
  iconGreen: "#57D997",
  iconBlue: "#0081FB",
  iconBlueLight: "#E5F2FF",
  iconBlueBorder: "#B2D9FF",
  textDark: "#2C2C2E",

  // Utility
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
} as const;

export const colors = {
  // Backgrounds
  background: palette.white,
  backgroundSecondary: palette.gray10,
  backgroundFeedback: palette.green10,
  backgroundHighlights: palette.green10,

  // Brand
  primary: palette.orange50,
  primaryLight: palette.orange10,
  primaryDark: palette.orange60,

  // Text
  textPrimary: palette.gray90,
  textSecondary: palette.gray60,
  textDisabled: palette.gray40,
  textInverse: palette.white,
  textLink: palette.orange50,
  textDark: palette.textDark,

  // Border
  border: palette.gray30,
  borderFocused: palette.orange50,

  // Feedback / status
  success: palette.green50,
  successLight: palette.green10,
  error: "#EF4444",
  errorLight: "#FEF2F2",

  // Cards
  cardBackground: palette.white,
  cardBorder: palette.gray30,
  cardGreen: palette.cardGreen,
  cardGreenDark: palette.cardGreenDark,
  cardGreenDarker: palette.cardGreenDarker,
  cardOrange: palette.cardOrange,
  cardYellow: palette.cardYellow,
  cardGray: palette.cardGray,
  bannerYellow: palette.bannerYellow,
  badgeGold: palette.badgeGold,

  // Button
  buttonPrimary: palette.orange50,
  buttonPrimaryText: palette.white,
  buttonDisabled: palette.gray30,
  buttonDisabledText: palette.gray50,

  // Icons
  iconGreen: palette.iconGreen,
  iconBlue: palette.iconBlue,
  iconBlueLight: palette.iconBlueLight,
  iconBlueBorder: palette.iconBlueBorder,
} as const;

export type Colors = typeof colors;
