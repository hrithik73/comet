import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { mmkvStorage } from '~/store/storage';
import { ColorScheme } from '~/theme/tokens';

/** What the user picked. `system` follows the OS. */
export type ThemeMode = 'system' | ColorScheme;

type ThemeStore = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: 'system',
      setMode: (mode) => set({ mode }),
    }),
    { name: 'theme-mode', storage: createJSONStorage(() => mmkvStorage) },
  ),
);
