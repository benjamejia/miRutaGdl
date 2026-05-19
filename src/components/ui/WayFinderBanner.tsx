import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function WayFinderBanner() {
  const router = useRouter();

  return (
    <YStack
      borderRadius={24}
      overflow="hidden"
      cursor="pointer"
      onPress={() => router.push('/(app)/routes')}
      pressStyle={{ opacity: 0.92, scale: 0.98 }}
      minHeight={160}
      position="relative"
    >
      <LinearGradient
        start={[0.1, 0.1]}
        end={[0.9, 0.9]}
        colors={['#3B1D8F', '#5D00E3', '#7B3FE0']}
        style={{ position: 'absolute', inset: 0 }}
      />

      <YStack position="absolute" top={-10} right={-10} opacity={0.08}>
        <MaterialIcons name="flag" size={120} color="#FFFFFF" />
      </YStack>
      <YStack position="absolute" bottom={-20} left={-15} opacity={0.06}>
        <MaterialIcons name="explore" size={140} color="#FFFFFF" />
      </YStack>

      <XStack flex={1} padding="$5" gap="$4" alignItems="center" $gtSm={{ padding: '$6' }}>
        <YStack
          width={56}
          height={56}
          borderRadius={16}
          backgroundColor="rgba(255,255,255,0.15)"
          justifyContent="center"
          alignItems="center"
          flexShrink={0}
        >
          <MaterialIcons name="explore" size={30} color="#FF6B00" />
        </YStack>

        <YStack flex={1} gap={6}>
          <XStack gap={8} alignItems="center">
            <YStack paddingHorizontal={10} paddingVertical={3} backgroundColor="rgba(255,107,0,0.25)" borderRadius="$10">
              <Text fontSize={10} fontWeight="800" color="#FF8C3A" textTransform="uppercase" letterSpacing={1.2}>
                WayFinder
              </Text>
            </YStack>
          </XStack>

          <Text fontFamily="$heading" fontSize={20} fontWeight="800" color="#FFFFFF" lineHeight={24} letterSpacing={-0.3}>
            ZMG → Estadio Akron
          </Text>

          <Text fontSize={13} color="rgba(255,255,255,0.8)" lineHeight={18}>
            11 rutas directas desde toda la ciudad. Encuentra la mejor opción para llegar al Mundial.
          </Text>

          <XStack gap={8} alignItems="center" marginTop={4}>
            <XStack
              backgroundColor="#FF6B00"
              paddingHorizontal={16}
              paddingVertical={8}
              borderRadius={12}
              gap={6}
              alignItems="center"
            >
              <Text fontSize={12} fontWeight="800" color="#FFFFFF" textTransform="uppercase" letterSpacing={0.8}>
                Explorar rutas
              </Text>
              <MaterialIcons name="arrow-forward" size={16} color="#FFFFFF" />
            </XStack>
          </XStack>
        </YStack>
      </XStack>
    </YStack>
  );
}
