import { ScrollView, StyleSheet, Text } from 'react-native';

import { Row } from '~/components/row';
import { Section } from '~/components/section';
import { colors, spacing } from '~/theme';

export function AboutScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.body}>
        A minimal Expo + React Navigation boilerplate: a drawer at the root
        wrapping a bottom-tab navigator.
      </Text>

      <Section title='Versions'>
        <Row label='Expo SDK' value='57' />
        <Row label='React Native' value='0.86' />
        <Row label='React Navigation' value='7' last />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg },
  title: { fontSize: 30, fontWeight: '700', color: colors.text },
  body: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.muted,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
});
