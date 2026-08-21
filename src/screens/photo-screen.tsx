import type { RouteProp } from '@react-navigation/native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown, SharedTransitionBoundary } from 'react-native-reanimated';

import type { HomeStackParamList } from '~/navigation/home-stack';
import { fullUrl, thumbUrl } from '~/services/photos';
import { makeStyles } from '~/theme';

export function PhotoScreen() {
  const styles = useStyles();
  const { photo } = useRoute<RouteProp<HomeStackParamList, 'Photo'>>().params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // The drawer sits above this stack and draws its own header — hide it while
  // the photo is open so the image runs edge to edge under one transparent bar.
  useLayoutEffect(() => {
    const drawer = navigation.getParent()?.getParent();
    drawer?.setOptions({ headerShown: false });
    return () => drawer?.setOptions({ headerShown: true });
  }, [navigation]);

  return (
    <SharedTransitionBoundary isActive={isFocused}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior='never'
      >
        <Animated.Image
          sharedTransitionTag={`photo-${photo.id}`}
          source={{ uri: fullUrl(photo) }}
          // Prefetched from the grid, so this is already cached by the time we arrive.
          defaultSource={{ uri: thumbUrl(photo) }}
          style={[styles.image, { aspectRatio: photo.width / photo.height }]}
          resizeMode='cover'
        />
        <Animated.View entering={FadeInDown.delay(160).duration(420)} style={styles.details}>
          <Text style={styles.author}>{photo.author}</Text>
          <Detail label='ID' value={photo.id} />
          <Detail label='Dimensions' value={`${photo.width} × ${photo.height}`} />
          <Detail label='Source' value={photo.url} />
        </Animated.View>
      </ScrollView>
    </SharedTransitionBoundary>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  const styles = useStyles();
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const useStyles = makeStyles(({ colors, spacing, typography }) => ({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: spacing.xl },
  image: { alignSelf: 'stretch', overflow: 'hidden', backgroundColor: colors.accentMuted },
  details: { padding: spacing.lg, gap: spacing.sm },
  author: { ...typography.role.title, color: colors.text },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  detailLabel: { ...typography.role.body, color: colors.textMuted },
  detailValue: { ...typography.role.body, color: colors.text, flexShrink: 1 },
}));
