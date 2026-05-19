import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useThemeName } from 'tamagui';
import { RouteMapView } from '../../src/components';

const bg = { light: '#F6F6F9', dark: '#0C0E10' };

export default function LinesScreen() {
  const themeName = useThemeName();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg[themeName as keyof typeof bg] ?? '#F6F6F9' }}>
      <StatusBar barStyle={themeName === 'dark' ? 'light-content' : 'dark-content'} />
      <RouteMapView />
    </SafeAreaView>
  );
}
