import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../src/tamagui.config';
import { ThemeModeProvider, useThemeMode } from '../src/hooks/useThemeMode';

SplashScreen.preventAutoHideAsync();

function RootLayoutInner() {
  const { theme } = useThemeMode();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={theme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />
        <Stack.Screen name="results" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </TamaguiProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeModeProvider>
      <RootLayoutInner />
    </ThemeModeProvider>
  );
}
