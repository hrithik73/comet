import { useIsFocused, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text } from 'react-native';
import Animated, { FadeInDown, SharedTransitionBoundary } from 'react-native-reanimated';

import type { HomeStackParamList } from '~/navigation/home-stack';
import { fetchPhotos, fullUrl, thumbUrl, type Photo } from '~/services/photos';
import { makeStyles } from '~/theme';

export function HomeScreen() {
  const styles = useStyles();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [error, setError] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchPhotos().then(setPhotos, () => setError(true));
  }, []);

  if (error) return <Text style={styles.state}>Could not load photos.</Text>;
  if (!photos) return <ActivityIndicator style={styles.state} />;

  return (
    <SharedTransitionBoundary isActive={isFocused}>
      <FlatList
        data={photos}
        keyExtractor={(p) => p.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.column}
        ListHeaderComponent={
          <Animated.Text entering={FadeInDown.duration(420)} style={styles.title}>
            Hello
          </Animated.Text>
        }
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(60 + index * 40).duration(420)}>
            <Pressable
              onPress={() => navigation.navigate('Photo', { photo: item })}
              accessibilityRole='button'
              accessibilityLabel={`Photo by ${item.author}`}
            >
              <Animated.Image
                sharedTransitionTag={`photo-${item.id}`}
                source={{ uri: thumbUrl(item) }}
                style={styles.thumb}
                resizeMode='cover'
                // Warm the detail-size image once the thumb is up. FlatList only
                // renders a window, so this never fetches the whole list at once.
                onLoad={() => Image.prefetch(fullUrl(item))}
              />
            </Pressable>
          </Animated.View>
        )}
      />
    </SharedTransitionBoundary>
  );
}

const useStyles = makeStyles(({ colors, spacing, radius, typography }) => ({
  list: { padding: spacing.lg, backgroundColor: colors.bg, flexGrow: 1 },
  column: { gap: spacing.md, marginBottom: spacing.md },
  title: {
    ...typography.role.title,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  thumb: {
    flex: 1,
    aspectRatio: 1,
    width: 160,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.accentMuted,
  },
  state: {
    flex: 1,
    alignSelf: 'center',
    marginTop: spacing.lg,
    color: colors.textMuted,
  },
}));
