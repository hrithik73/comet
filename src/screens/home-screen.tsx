import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Row } from '~/components/row';
import { Section } from '~/components/section';
import { colors, radius, spacing } from '~/theme';

export function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
    >
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Expo Starter</Text>
        <Text style={styles.heroSubtitle}>
          Drawer + tabs wired up and ready. Replace these screens with your own.
        </Text>
      </View>

      <View style={styles.stats}>
        <Stat icon='layers-outline' label='Screens' value='3' />
        <Stat icon='git-branch-outline' label='Navigators' value='2' />
        <Stat icon='cube-outline' label='Deps' value='10' />
      </View>

      <Section title='What is set up'>
        <Row label='Drawer navigator' value='Root' />
        <Row label='Bottom tabs' value='Home · Settings' />
        <Row label='Safe area' value='Enabled' />
        <Row label='TypeScript' value='Strict' last />
      </Section>
    </ScrollView>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={20} color={colors.accent} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg },
  hero: { marginBottom: spacing.xl },
  heroTitle: { fontSize: 30, fontWeight: '700', color: colors.text },
  heroSubtitle: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.muted,
    marginTop: spacing.sm,
  },
  stats: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
  stat: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    gap: 2,
  },
  statValue: { fontSize: 22, fontWeight: '700', color: colors.text },
  statLabel: { fontSize: 12, color: colors.muted },
});
