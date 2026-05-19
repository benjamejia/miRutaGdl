import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

export function FanFestBanner() {
  return (
    <YStack
      borderRadius={24}
      overflow="hidden"
      pressStyle={{ opacity: 0.92, scale: 0.98 }}
      minHeight={160}
      position="relative"
      backgroundColor="#E84393"
    >
      <XStack
        padding="$5"
        gap="$4"
        alignItems="center"
        $gtSm={{ padding: '$6' }}
        width="100%"
      >
        <YStack
          width={56}
          height={56}
          borderRadius={16}
          backgroundColor="rgba(255,255,255,0.15)"
          justifyContent="center"
          alignItems="center"
          flexShrink={0}
        >
          <MaterialIcons name="music-note" size={30} color="#ffffff" />
        </YStack>

        <YStack flex={1} gap={6}>
          <XStack gap={8} alignItems="center">
            <YStack paddingHorizontal={10} paddingVertical={3} backgroundColor="rgba(0,255,180,0.25)" borderRadius="$10">
              <Text fontSize={10} fontWeight="800" color="#00FFB4" textTransform="uppercase" letterSpacing={1.2}>
                Fan Fest
              </Text>
            </YStack>
          </XStack>

          <Text fontFamily="$heading" fontSize={20} fontWeight="800" color="#ffffff" lineHeight={24} letterSpacing={-0.3}>
            FIFA Fan Festival
          </Text>

          <Text fontSize={13} color="rgba(255, 255, 255, 0.8)" lineHeight={18}>
            Música, pantallas gigantes y la mejor atmósfera mundialista en el Parque de las Niñas y Niños.
          </Text>

          <XStack gap={8} alignItems="center" marginTop={4}>
            <XStack
              backgroundColor="#00FFB4"
              paddingHorizontal={16}
              paddingVertical={8}
              borderRadius={12}
              cursor="pointer"
              gap={6}
              alignItems="center"
            >
              <Text fontSize={12} fontWeight="800" color="#1A1A2E" textTransform="uppercase" letterSpacing={0.8}>
                Ver cartelera
              </Text>
              <MaterialIcons name="arrow-forward" size={16} color="#1A1A2E" />
            </XStack>
          </XStack>
        </YStack>
      </XStack>
    </YStack>
  );
}
