import type { ExpoConfig } from 'expo/config';

// Build flavours: APP_VARIANT=dev installs alongside prod with its own icon and name.
const isDev = process.env.APP_VARIANT === 'dev';
const id = `com.hrithik73.comet${isDev ? '.dev' : ''}`;

const config: ExpoConfig = {
  name: isDev ? 'Comet (Dev)' : 'Comet',
  slug: 'comet',
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
};

export default config;
