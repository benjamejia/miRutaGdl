import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export function WorldCupPromoCard() {
  return (
    <YStack paddingHorizontal="$6" paddingVertical="$6">
      <YStack height={160} borderRadius={24} overflow="hidden" position="relative">
        <LinearGradient
          start={[0, 0]}
          end={[1, 1]}
          colors={['#6200EE', '#4A00B0', '#380090']}
          style={{ position: 'absolute', inset: 0 }}
        />
        <YStack
          position="absolute"
          right={-24}
          top={-12}
          opacity={0.1}
        >
          <MaterialIcons name="sports-soccer" size={120} color="white" />
        </YStack>
        <YStack
          position="absolute"
          right={-30}
          bottom={-30}
          width={120}
          height={120}
          borderRadius={60}
          backgroundColor="$primary"
          opacity={0.15}
        />
        <YStack flex={1} padding="$6" justifyContent="center" gap={8} zIndex={1}>
          <XStack gap={6} alignItems="center" opacity={0.8}>
            <MaterialIcons name="emoji-events" size={14} color="white" />
            <Text fontSize={10} fontWeight="700" color="white" textTransform="uppercase" letterSpacing={2}>
              Rutas Oficiales FIFA 2026
            </Text>
          </XStack>
          <Text fontSize={17} fontWeight="700" color="white" lineHeight={22}>
            Acceso prioritario al Estadio Akron para asistentes
          </Text>
          <Text fontSize={12} color="rgba(255,255,255,0.8)" lineHeight={16}>
            Usa la línea púrpura para transporte gratuito con tu Fan ID.
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
}
