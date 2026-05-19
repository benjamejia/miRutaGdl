import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { RouteMapView } from '../../src/components';

export default function LinesScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F6F9' }}>
      <StatusBar barStyle="dark-content" />
      <RouteMapView />
    </SafeAreaView>
  );
}
