import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Row } from '~/components/row';
import { Section } from '~/components/section';
import { makeStyles, ThemeMode, useTheme } from '~/theme';

const MODES: { mode: ThemeMode; label: string }[] = [
  { mode: 'system', label: 'System' },
  { mode: 'light', label: 'Light' },
  { mode: 'dark', label: 'Dark' },
];

export function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { colors, spacing, mode, setMode } = useTheme();
  const styles = useStyles();
  const [notifications, setNotifications] = useState(true);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
    >
      <Section title='Appearance'>
        {MODES.map(({ mode: value, label }, index) => (
          <Row
            key={value}
            label={label}
            onPress={() => setMode(value)}
            last={index === MODES.length - 1}
            right={
              mode === value ? (
                <Ionicons name='checkmark' size={20} color={colors.accent} />
              ) : null
            }
          />
        ))}
      </Section>

      <Section title='Preferences'>
        <Row
          label='Notifications'
          right={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ true: colors.accent }}
            />
          }
        />
        <Row label='Version' value='1.0.0' last />
      </Section>
    </ScrollView>
  );
}

const useStyles = makeStyles(({ colors, spacing }) => ({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg },
}));
