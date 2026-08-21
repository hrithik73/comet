import { Text, View } from 'react-native';
import { makeStyles } from '~/theme';

export function HomeScreen() {
  const styles = useStyles();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Hello</Text>
      <Text style={styles.subtitle}>Welcome back.</Text>
    </View>
  );
}

const useStyles = makeStyles(({ colors, spacing, typography }) => ({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
    padding: spacing.lg,
  },
  title: { ...typography.role.title, color: colors.text },
  subtitle: {
    ...typography.role.body,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
}));
