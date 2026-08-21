/**
 * Raw color ramps. No semantics here — these are just named steps.
 * To reskin the app, change the hexes here and (if needed) the mappings in tokens.ts.
 */

export const palette = {
  neutral: {
    50: '#F6F7F9',
    100: '#ECEDEE',
    200: '#E6E8EB',
    300: '#CDD1D5',
    400: '#9BA1A6',
    500: '#687076',
    600: '#4A5054',
    700: '#3A3F43',
    800: '#26292C',
    900: '#16191B',
    950: '#0B0D0E',
  },
  brand: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    900: '#1E3A5F',
  },
  success: { 400: '#4ADE80', 600: '#16A34A' },
  warning: { 400: '#FBBF24', 600: '#D97706' },
  danger: { 400: '#F87171', 600: '#DC2626' },
  info: { 400: '#22D3EE', 600: '#0891B2' },

  white: '#FFFFFF',
  black: '#000000',
} as const;
