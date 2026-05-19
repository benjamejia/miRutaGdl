import React from 'react';
import { ScrollView, YStack, XStack, Text, Button } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  ContextRouteHeader,
  MapPlaceholder,
  AlternativeRouteCard,
  WorldCupPromoCard,
} from '../src/components';

import type { AlternativeRouteData } from '../src/components';

export const options = { headerShown: false };

const routes: AlternativeRouteData[] = [
  {
    id: 'fastest',
    duration: 28,
    departureLabel: 'Sale en 4 min',
    badges: [{ label: 'Más rápido', variant: 'primary' }],
    walkTime: 6,
    segments: [
      { type: 'bus', line: 'C121', color: '#6200EE' },
      { type: 'traffic', duration: '+5 min' },
    ],
  },
  {
    id: 'direct',
    duration: 35,
    departureLabel: 'Sale en 12 min',
    badges: [],
    walkTime: 2,
    segments: [
      { type: 'bus', line: 'T01', color: '#6200EE' },
      { type: 'traffic', duration: 'Directo' },
    ],
  },
  {
    id: 'multileg',
    duration: 42,
    departureLabel: 'Sale en 8 min',
    badges: [],
    walkTime: 0,
    segments: [
      { type: 'bus', line: 'C110', color: '#6200EE' },
      { type: 'train', line: 'L3', color: '#FF6B00' },
    ],
  },
];

export default function ResultsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F6F9' }}>
      <StatusBar barStyle="dark-content" />
      <HeaderWithBack />
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack
          $gtMd={{ maxWidth: 960, alignSelf: 'center', width: '100%' }}
        >
          <ContextRouteHeader onSwap={() => {}} />
          <MapPlaceholder />
          <AlternativesSection />
          <WorldCupPromoCard />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

function HeaderWithBack() {
  return (
    <XStack
      paddingHorizontal={24}
      paddingVertical={12}
      alignItems="center"
      gap={12}
      $gtMd={{ maxWidth: 960, alignSelf: 'center', width: '100%', paddingHorizontal: 0 }}
    >
      <XStack
        width={38}
        height={38}
        borderRadius={12}
        justifyContent="center"
        alignItems="center"
        pressStyle={{ backgroundColor: '$surface' }}
        cursor="pointer"
        onPress={() => {}}
      >
        <MaterialIcons name="arrow-back" size={22} color="$color" />
      </XStack>
      <XStack gap={10} alignItems="center">
        <XStack
          width={34}
          height={34}
          borderRadius={10}
          backgroundColor="rgba(255,107,0,0.1)"
          justifyContent="center"
          alignItems="center"
        >
          <MaterialIcons name="directions-bus" size={18} color="#FF6B00" />
        </XStack>
        <Text fontFamily="$heading" fontSize={17} fontWeight="800" color="$color" letterSpacing={-0.3}>
          MiRuta Gdl
        </Text>
      </XStack>
      <XStack flex={1} />
      <XStack
        width={38}
        height={38}
        borderRadius={12}
        justifyContent="center"
        alignItems="center"
        pressStyle={{ backgroundColor: '$surface' }}
        cursor="pointer"
      >
        <MaterialIcons name="translate" size={20} color="$colorHover" />
      </XStack>
    </XStack>
  );
}

function AlternativesSection() {
  return (
    <YStack
      paddingHorizontal="$6"
      paddingTop="$4"
      backgroundColor="#F6F6F9"
      borderTopLeftRadius={32}
      borderTopRightRadius={32}
      marginTop={-16}
      zIndex={10}
    >
      <XStack justifyContent="space-between" alignItems="center" marginBottom={24}>
        <Text fontFamily="$heading" fontSize={20} fontWeight="700" color="$color" letterSpacing={-0.3}>
          Mejores alternativas
        </Text>
        <XStack gap={4} alignItems="center" cursor="pointer" pressStyle={{ opacity: 0.6 }}>
          <MaterialIcons name="filter-list" size={16} color="$primary" />
          <Text fontSize={13} fontWeight="600" color="$primary">
            Filtros
          </Text>
        </XStack>
      </XStack>

      <YStack gap="$4" paddingBottom="$4">
        {routes.map((route) => (
          <AlternativeRouteCard key={route.id} route={route} onPress={() => {}} />
        ))}
      </YStack>
    </YStack>
  );
}
