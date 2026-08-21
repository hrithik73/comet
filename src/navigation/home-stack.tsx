import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '~/screens/home-screen';
import { PhotoScreen } from '~/screens/photo-screen';
import type { Photo } from '~/services/photos';

export type HomeStackParamList = {
  Feed: undefined;
  Photo: { photo: Photo };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name='Feed' component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name='Photo'
        component={PhotoScreen}
        options={{
          title: '',
          headerTransparent: true,
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}
