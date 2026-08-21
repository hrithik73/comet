# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

## Conventions

- Absolute imports: `~/*` maps to `./src/*`. Use `~/components/...`, never `../../`.
- Files and folders: `kebab-case` (e.g. `src/components/user-card.tsx`).
- One component per file, exported as a named export (no default exports).

## Design system

All colors come from `~/theme`. Never hardcode a hex in a component.

- `src/theme/palette.ts` — raw color ramps. Reskin the app here.
- `src/theme/tokens.ts` — semantic tokens (`lightColors` / `darkColors`, both typed
  `ColorTokens`), plus `spacing`, `radius`, `typography`, `shadows`.
- `src/theme/theme-provider.tsx` — `useTheme()`, and the persisted `system | light | dark` mode.

Styling pattern: build a `useStyles()` hook with `makeStyles` at module scope, where a plain
`StyleSheet.create` would normally go. Components then use `styles.x` as usual — no inline
color objects, no style arrays.

```tsx
export function Card() {
  const styles = useStyles();
  return <View style={styles.card} />;
}

const useStyles = makeStyles(({ colors, spacing, radius }) => ({
  card: { backgroundColor: colors.card, padding: spacing.lg, borderRadius: radius.md },
}));
```

The stylesheet is cached per color scheme, so the factory runs at most twice for the whole app
lifetime. Only values that depend on props, state or measurements (insets, animations) stay
inline on the element.

Adding a color means adding it to `ColorTokens` and to **both** palettes — a missing dark
value is a type error.
