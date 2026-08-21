import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
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

// ponytail: emoji tab icons; swap for @expo/vector-icons if the design needs real icons
const icon = (glyph: string) => () => <Text>{glyph}</Text>;

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
        options={{ tabBarIcon: icon('🏠') }}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{ tabBarIcon: icon('⚙️') }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
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
          options={{ title: 'Home' }}
        />
        <Drawer.Screen name='About' component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
