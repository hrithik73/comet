import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';

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

/** What the user picked. `system` follows the OS. */
export type ThemeMode = 'system' | ColorScheme;

const STORAGE_KEY = 'theme-mode';

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
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
          setModeState(stored);
        }
      })
      .catch(() => {
        // A failed read just means we fall back to `system`; not worth surfacing.
      })
      .finally(() => setLoaded(true));
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  }, []);

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

  // Hold the first frame until the stored mode is known, otherwise a dark-mode user
  // sees a light flash on every cold start.
  if (!loaded) return null;

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useTheme must be used inside a <ThemeProvider>');
  return theme;
}
