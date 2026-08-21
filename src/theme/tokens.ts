import { Platform, TextStyle, ViewStyle } from 'react-native';

import { palette } from '~/theme/palette';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = { sm: 8, md: 14, lg: 20, full: 999 } as const;

export const typography = {
  size: { xs: 12, sm: 14, md: 16, lg: 20, xl: 24, xxl: 30, xxxl: 32 },
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  /** Ready-to-spread text roles. Color is applied by the consumer from `colors`. */
  role: {
    title: { fontSize: 32, fontWeight: '700', lineHeight: 38 },
    heading: { fontSize: 20, fontWeight: '600', lineHeight: 26 },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
    label: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
    caption: {
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 0.6,
      lineHeight: 16,
    },
  },
} as const satisfies {
  size: Record<string, number>;
  weight: Record<string, TextStyle['fontWeight']>;
  role: Record<string, TextStyle>;
};

/**
 * Every semantic color the app is allowed to use. Both palettes must satisfy this
 * exact key set — that is what makes a missing dark value a type error, not a bug.
 */
export type ColorTokens = {
  bg: string;
  bgElevated: string;
  card: string;
  border: string;
  borderStrong: string;
  text: string;
  textMuted: string;
  textInverse: string;
  accent: string;
  accentMuted: string;
  onAccent: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  overlay: string;
};

export const lightColors: ColorTokens = {
  bg: palette.neutral[50],
  bgElevated: palette.white,
  card: palette.white,
  border: palette.neutral[200],
  borderStrong: palette.neutral[300],
  text: '#11181C',
  textMuted: palette.neutral[500],
  textInverse: palette.white,
  accent: palette.brand[500],
  accentMuted: palette.brand[100],
  onAccent: palette.white,
  success: palette.success[600],
  warning: palette.warning[600],
  danger: palette.danger[600],
  info: palette.info[600],
  overlay: 'rgba(0,0,0,0.4)',
};

export const darkColors: ColorTokens = {
  bg: palette.neutral[950],
  bgElevated: palette.neutral[900],
  card: palette.neutral[900],
  border: palette.neutral[800],
  borderStrong: palette.neutral[700],
  text: palette.neutral[100],
  textMuted: palette.neutral[400],
  textInverse: '#11181C',
  accent: palette.brand[400],
  accentMuted: palette.brand[900],
  onAccent: palette.neutral[950],
  success: palette.success[400],
  warning: palette.warning[400],
  danger: palette.danger[400],
  info: palette.info[400],
  overlay: 'rgba(0,0,0,0.6)',
};

export type ColorScheme = 'light' | 'dark';

export const colorSchemes: Record<ColorScheme, ColorTokens> = {
  light: lightColors,
  dark: darkColors,
};

export type Shadows = { sm: ViewStyle; md: ViewStyle; lg: ViewStyle };

const iosShadow = (
  opacity: number,
  radiusPx: number,
  y: number,
): ViewStyle => ({
  shadowColor: palette.black,
  shadowOpacity: opacity,
  shadowRadius: radiusPx,
  shadowOffset: { width: 0, height: y },
});

/**
 * Dark surfaces read depth from borders, not shadows — a black shadow on a near-black
 * background is invisible — so elevation is mode-keyed rather than shared.
 */
export const shadows: Record<ColorScheme, Shadows> = {
  light: {
    sm: Platform.select({
      android: { elevation: 1 },
      default: iosShadow(0.05, 2, 1),
    }) as ViewStyle,
    md: Platform.select({
      android: { elevation: 3 },
      default: iosShadow(0.08, 8, 3),
    }) as ViewStyle,
    lg: Platform.select({
      android: { elevation: 6 },
      default: iosShadow(0.12, 16, 6),
    }) as ViewStyle,
  },
  dark: {
    sm: Platform.select({
      android: { elevation: 1 },
      default: iosShadow(0.3, 2, 1),
    }) as ViewStyle,
    md: Platform.select({
      android: { elevation: 3 },
      default: iosShadow(0.4, 8, 3),
    }) as ViewStyle,
    lg: Platform.select({
      android: { elevation: 6 },
      default: iosShadow(0.5, 16, 6),
    }) as ViewStyle,
  },
};
