import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { Theme, useTheme } from '~/theme/theme-provider';
import { ColorScheme } from '~/theme/tokens';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

/**
 * Builds a `useStyles()` hook from a theme-aware stylesheet factory, so components keep
 * writing plain `styles.x` instead of inline `[styles.x, { color: colors.y }]` arrays.
 *
 * The result is a real `StyleSheet.create` output, cached per color scheme at module
 * scope — there are only ever two schemes, so the factory runs at most twice for the
 * whole app lifetime, not once per component instance or per render.
 *
 * Call at module scope, next to where `StyleSheet.create` used to live:
 *
 *   const useStyles = makeStyles(({ colors, spacing }) => ({
 *     card: { backgroundColor: colors.card, padding: spacing.lg },
 *   }));
 *
 * The factory must derive everything from the theme. Anything that depends on props or
 * state (a measured width, an animated value) stays an inline style on the element.
 *
 * The `T & NamedStyles<T>` return type is deliberate and mirrors RN's own
 * `StyleSheet.create` signature: `T` alone infers the key names but leaves the value
 * objects with no contextual type, which kills autocomplete inside a new `{}`. The
 * intersection supplies that contextual type while keeping the inferred keys.
 */
export function makeStyles<T extends NamedStyles<T> | NamedStyles<never>>(
  factory: (theme: Theme) => T & NamedStyles<T>,
): () => T {
  const cache = new Map<ColorScheme, T>();

  return function useStyles(): T {
    const theme = useTheme();

    let styles = cache.get(theme.scheme);
    if (!styles) {
      styles = StyleSheet.create(factory(theme));
      cache.set(theme.scheme, styles);
    }
    return styles;
  };
}
