import React from 'react';
import { ScrollView, YStack } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { HeroBanner, PulseSearchBar, WayFinderBanner, FanFestBanner } from '../../src/components';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F6F9' }}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack $gtMd={{ maxWidth: 960, alignSelf: 'center', width: '100%' }}>
          <YStack
            backgroundColor="#e7e7e7"
            paddingHorizontal={24}
            paddingTop={20}
            paddingBottom={32}
            gap={48}
          >
            <HeroBanner
              tag="Guadalajara 2026"
              title="Vive la Pasión en Zapopan"
              subtitle="El epicentro del fútbol mundial se traslada a la ciudad de las niñas y los niños."
            />
            
            <PulseSearchBar 
              onSearch={() => {}} 
              onFocus={() => router.push('/(app)/routes')} 
            />
            <FanFestBanner />
            <WayFinderBanner />
            <WayFinderBanner />
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
