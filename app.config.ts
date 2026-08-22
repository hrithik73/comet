import type { ExpoConfig } from 'expo/config';
import { name as slug } from './package.json';

// Build flavours: APP_VARIANT=dev installs alongside prod with its own icon and name.
const isDev = process.env.APP_VARIANT === 'dev';
// create-expo-app rewrites package.json's name, so the whole project renames from there.
const name = slug.replace(
  /(^|-)(\w)/g,
  (_, sep, c) => (sep ? ' ' : '') + c.toUpperCase(),
);
// Change with `bun run setup` (or edit it here).
const org = 'com.hrithik73';
const id = `${org}.${slug.replace(/-/g, '')}${isDev ? '.dev' : ''}`;

const config: ExpoConfig = {
  name: isDev ? `${name} (Dev)` : name,
  slug,
  version: '1.0.0',
  description: 'A starter template for Expo projects.',
  orientation: 'portrait',
  icon: isDev ? './src/assets/icon-dev.png' : './src/assets/icon.png',
  userInterfaceStyle: 'automatic',
  ios: {
    supportsTablet: true,
    bundleIdentifier: id,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#14161A',
      foregroundImage: './src/assets/android-icon-foreground.png',
      backgroundImage: './src/assets/android-icon-background.png',
      monochromeImage: './src/assets/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
    package: id,
  },
  web: {
    favicon: './src/assets/favicon.png',
  },
  // Points the Android theme at Material 3 so the native tab bar matches the
  // platform. iOS needs nothing here — UITabBar picks up Liquid Glass on 26+.
  plugins: [['react-native-bottom-tabs', { theme: 'material3' }]],
};

export default config;
