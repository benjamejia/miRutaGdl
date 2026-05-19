import React from 'react';
import { XStack, Text } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { RouteMapView } from '../../src/components';

export default function RoutesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F6F9' }}>
      <StatusBar barStyle="dark-content" />
      <XStack
        paddingHorizontal="$5"
        paddingVertical="$3"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="$surfaceLowest"
      >
        <XStack
          width={44}
          height={44}
          borderRadius="$5"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          pressStyle={{ opacity: 0.6, backgroundColor: '$surface' }}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/(tabs)');
            }
          }}
        >
          <MaterialIcons name="arrow-back" size={24} color="$primary" />
        </XStack>
        <XStack gap="$2" alignItems="center">
          <MaterialIcons name="directions-bus" size={20} color="$primary" />
          <Text fontFamily="$heading" fontSize={17} fontWeight="800" color="$color" letterSpacing={0.3}>
            MiRuta Gdl
          </Text>
        </XStack>
        <XStack
          width={44}
          height={44}
          borderRadius="$5"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          pressStyle={{ opacity: 0.6, backgroundColor: '$surface' }}
        >
          <MaterialIcons name="translate" size={22} color="$colorHover" />
        </XStack>
      </XStack>
      <RouteMapView />
    </SafeAreaView>
  );
}
