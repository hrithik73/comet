import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { AboutScreen } from '~/screens/about-screen';
import { HomeScreen } from '~/screens/home-screen';
import { SettingsScreen } from '~/screens/settings-screen';
import { colors } from '~/theme';

export type TabParamList = {
  Home: undefined;
  Settings: undefined;
};

export type RootDrawerParamList = {
  Tabs: undefined;
  About: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

const icon =
  (name: keyof typeof Ionicons.glyphMap) =>
  ({ color, size }: { color: string; size: number }) => (
    <Ionicons name={name} color={color} size={size} />
  );

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { borderTopColor: colors.border },
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
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.text,
          drawerActiveTintColor: colors.accent,
          drawerInactiveTintColor: colors.muted,
        }}
      >
        <Drawer.Screen
          name='Tabs'
          component={Tabs}
          options={{ title: 'Home', drawerIcon: icon('home-outline') }}
        />
        <Drawer.Screen
          name='About'
          component={AboutScreen}
          options={{ drawerIcon: icon('information-circle-outline') }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
