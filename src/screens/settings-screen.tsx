import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Row } from '~/components/row';
import { Section } from '~/components/section';
import { colors, spacing } from '~/theme';

export function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
    >
      <Text style={styles.title}>Settings</Text>

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
        <Row
          label='Share analytics'
          right={
            <Switch
              value={analytics}
              onValueChange={setAnalytics}
              trackColor={{ true: colors.accent }}
            />
          }
          last
        />
      </Section>

      <Section title='Account'>
        <Row label='Email' value='you@example.com' />
        <Row label='Plan' value='Free' last />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xl,
  },
});
