import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { makeStyles } from '~/theme';

export function Section({ title, children }: { title: string; children: ReactNode }) {
  const styles = useStyles();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

const useStyles = makeStyles(({ colors, radius, spacing, typography }) => ({
  section: { marginBottom: spacing.xl },
  sectionTitle: {
    ...typography.role.caption,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
}));
