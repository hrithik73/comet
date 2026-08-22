import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import type { SFSymbol } from 'sf-symbols-typescript';

import { HomeStack } from '~/navigation/home-stack';
import { SettingsScreen } from '~/screens/settings-screen';
import { navigationTheme, useTheme } from '~/theme';

export type TabParamList = {
  Home: undefined;
  Settings: undefined;
};

export type RootDrawerParamList = {
  Tabs: undefined;
};

const Tab = createNativeBottomTabNavigator<TabParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

const icon =
  (name: keyof typeof Ionicons.glyphMap) =>
  ({ color, size }: { color: string; size: number }) => (
    <Ionicons name={name} color={color} size={size} />
  );

/** The native tab bar takes SF Symbols on iOS and drawables/images on Android. */
const sfSymbol = (sfSymbol: SFSymbol) => () => ({ sfSymbol });

function Tabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      // Renders a real UITabBar, so iOS 26 gives it Liquid Glass for free —
      // including the scroll-away minimize behaviour. Pre-26 it falls back to
      // the standard translucent bar.
      screenOptions={{ tabBarActiveTintColor: colors.accent }}
      minimizeBehavior='onScrollDown'
    >
      <Tab.Screen
        name='Home'
        component={HomeStack}
        options={{ tabBarIcon: sfSymbol('house') }}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{ tabBarIcon: sfSymbol('gearshape') }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const { colors, scheme } = useTheme();

  return (
    <NavigationContainer theme={navigationTheme(scheme)}>
      <Drawer.Navigator
        screenOptions={{
          headerShadowVisible: false,
          drawerActiveTintColor: colors.accent,
          drawerInactiveTintColor: colors.textMuted,
        }}
      >
        <Drawer.Screen
          name='Tabs'
          component={Tabs}
          // The drawer header sits above the tabs, so it names the focused tab.
          options={({ route }) => ({
            title: getFocusedRouteNameFromRoute(route) ?? 'Home',
            drawerIcon: icon('home-outline'),
          })}
        />
      </Drawer.Navigator>
      {/* Driven by the resolved scheme so a manual override works, not just the OS setting. */}
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}
