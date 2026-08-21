import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { HomeScreen } from '~/screens/home-screen';
import { SettingsScreen } from '~/screens/settings-screen';
import { navigationTheme, useTheme } from '~/theme';

export type TabParamList = {
  Home: undefined;
  Settings: undefined;
};

export type RootDrawerParamList = {
  Tabs: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

const icon =
  (name: keyof typeof Ionicons.glyphMap) =>
  ({ color, size }: { color: string; size: number }) => (
    <Ionicons name={name} color={color} size={size} />
  );

function Tabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{ tabBarIcon: icon('home-outline') }}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{ tabBarIcon: icon('settings-outline') }}
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
          options={{ title: 'Home', drawerIcon: icon('home-outline') }}
        />
      </Drawer.Navigator>
      {/* Driven by the resolved scheme so a manual override works, not just the OS setting. */}
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}
