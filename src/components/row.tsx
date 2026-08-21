import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { makeStyles } from '~/theme';

export function Row({
  label,
  value,
  right,
  last,
  onPress,
}: {
  label: string;
  value?: string;
  right?: ReactNode;
  last?: boolean;
  onPress?: () => void;
}) {
  const styles = useStyles();

  const content = (
    <>
      <Text style={styles.rowLabel}>{label}</Text>
      {right ?? <Text style={styles.rowValue}>{value}</Text>}
    </>
  );

  if (!onPress) return <View style={[styles.row, last && styles.rowLast]}>{content}</View>;

  return (
    <Pressable
      style={({ pressed }) => [styles.row, last && styles.rowLast, pressed && styles.rowPressed]}
      onPress={onPress}
      accessibilityRole='button'
    >
      {content}
    </Pressable>
  );
}

const useStyles = makeStyles(({ colors, spacing, typography }) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg - 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    minHeight: 52,
  },
  rowLast: { borderBottomWidth: 0 },
  rowPressed: { backgroundColor: colors.bg },
  rowLabel: { ...typography.role.body, color: colors.text },
  rowValue: { ...typography.role.body, color: colors.textMuted },
}));
