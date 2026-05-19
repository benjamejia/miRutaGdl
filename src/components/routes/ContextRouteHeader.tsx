import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

interface ContextRouteHeaderProps {
  origin?: string;
  destination?: string;
  onSwap?: () => void;
}

export function ContextRouteHeader({
  origin = 'Tu ubicación',
  destination = 'Estadio Akron (World Cup 2026)',
  onSwap,
}: ContextRouteHeaderProps) {
  return (
    <YStack backgroundColor="$surfaceLowest" paddingHorizontal="$6" paddingVertical="$4">
      <XStack
        backgroundColor="$surfaceLow"
        borderRadius={16}
        padding="$4"
        gap="$4"
        alignItems="center"
      >
        <YStack alignItems="center" gap={4}>
          <MaterialIcons name="radio-button-checked" size={16} color="$secondary" />
          <YStack width={2} height={20} backgroundColor="$outline" opacity={0.3} />
          <MaterialIcons name="location-on" size={16} color="$primary" />
        </YStack>
        <YStack flex={1} gap={12}>
          <Text fontSize={13} fontWeight="600" color="$color" numberOfLines={1}>
            {origin}
          </Text>
          <YStack height={1} backgroundColor="$outline" opacity={0.15} />
          <Text fontSize={13} fontWeight="700" color="$color" numberOfLines={1}>
            {destination}
          </Text>
        </YStack>
        <XStack
          width={36}
          height={36}
          borderRadius="$10"
          backgroundColor="$surfaceHigh"
          justifyContent="center"
          alignItems="center"
          onPress={onSwap}
          pressStyle={{ opacity: 0.6 }}
          cursor="pointer"
        >
          <MaterialIcons name="swap-vert" size={20} color="$colorHover" />
        </XStack>
      </XStack>
    </YStack>
  );
}
