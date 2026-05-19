import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../src/tamagui.config';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="results" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </TamaguiProvider>
  );
}
