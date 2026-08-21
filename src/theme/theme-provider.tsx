import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { ThemeMode, useThemeStore } from '~/store/theme-store';
import {
  ColorScheme,
  ColorTokens,
  colorSchemes,
  radius,
  Shadows,
  shadows,
  spacing,
  typography,
} from '~/theme/tokens';

export type { ThemeMode };

export type Theme = {
  colors: ColorTokens;
  shadows: Shadows;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  /** The resolved scheme actually being rendered. */
  scheme: ColorScheme;
  /** The user's preference, which may be `system`. */
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);

  const resolvedSystem: ColorScheme =
    systemScheme === 'dark' ? 'dark' : 'light';
  const scheme: ColorScheme = mode === 'system' ? resolvedSystem : mode;

  const value = useMemo<Theme>(
    () => ({
      colors: colorSchemes[scheme],
      shadows: shadows[scheme],
      spacing,
      radius,
      typography,
      scheme,
      mode,
      setMode,
    }),
    [scheme, mode, setMode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useTheme must be used inside a <ThemeProvider>');
  return theme;
}
