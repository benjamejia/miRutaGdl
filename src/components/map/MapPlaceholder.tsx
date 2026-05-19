import React from 'react';
import { YStack, XStack, Text, Circle } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

interface RouteSummaryData {
  line: string;
  duration: string;
  status: string;
  statusColor?: string;
  arrival: string;
}

interface MapPlaceholderProps {
  routeSummary?: RouteSummaryData;
}

const defaultSummary: RouteSummaryData = {
  line: 'C121',
  duration: '32 min',
  status: 'A tiempo',
  arrival: 'Llegada 18:45',
};

export function MapPlaceholder({ routeSummary = defaultSummary }: MapPlaceholderProps) {
  return (
    <YStack height={397} width="100%" position="relative" overflow="hidden">
      <LinearGradient
        start={[0.2, 0]}
        end={[0.8, 1]}
        colors={['#D6CCE0', '#C4B8D4', '#B0A0C4']}
        style={{ position: 'absolute', inset: 0 }}
      />

      <YStack position="absolute" inset={0} opacity={0.15} justifyContent="center" alignItems="center">
        <MaterialIcons name="map" size={120} color="#6200EE" />
      </YStack>

      <YStack position="absolute" inset={0} justifyContent="center" alignItems="center">
        <XStack
          height={200}
          width={4}
          backgroundColor="$secondary"
          opacity={0.5}
          borderRadius={2}
          transform={[{ rotate: '-25deg' }]}
        />
        <Circle
          position="absolute"
          bottom="18%"
          left="22%"
          size={16}
          backgroundColor="white"
          borderWidth={3}
          borderColor="$secondary"
        />
        <Circle
          position="absolute"
          top="28%"
          right="18%"
          size={20}
          backgroundColor="$primary"
          borderWidth={3}
          borderColor="white"
        />
      </YStack>

      <XStack position="absolute" top="$4" right="$4" gap="$2">
        {['layers', 'my-location'].map((icon) => (
          <XStack
            key={icon}
            width={40}
            height={40}
            backgroundColor="rgba(255,255,255,0.9)"
            borderRadius="$10"
            justifyContent="center"
            alignItems="center"
            shadowColor="rgba(0,0,0,0.15)"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={1}
            shadowRadius={12}
            pressStyle={{ opacity: 0.7 }}
            cursor="pointer"
          >
            <MaterialIcons name={icon as any} size={20} color="$color" />
          </XStack>
        ))}
      </XStack>

      <YStack position="absolute" bottom="$6" left="$6" right="$6">
        <YStack
          backgroundColor="rgba(255,255,255,0.9)"
          borderRadius={16}
          padding="$4"
          shadowColor="rgba(0,0,0,0.15)"
          shadowOffset={{ width: 0, height: 8 }}
          shadowOpacity={1}
          shadowRadius={24}
          borderWidth={1}
          borderColor="rgba(255,255,255,0.2)"
        >
          <XStack justifyContent="space-between" alignItems="center">
            <XStack gap="$3" alignItems="center">
              <XStack
                backgroundColor="$secondary/0.1"
                width={40}
                height={40}
                borderRadius={12}
                justifyContent="center"
                alignItems="center"
              >
                <MaterialIcons name="directions-bus" size={20} color="$secondary" />
              </XStack>
              <YStack>
                <Text fontSize={11} fontWeight="700" color="$secondary" textTransform="uppercase" letterSpacing={1.5}>
                  Ruta Sugerida
                </Text>
                <Text fontSize={18} fontWeight="800" color="$color" lineHeight={22}>
                  {routeSummary.line} — {routeSummary.duration}
                </Text>
              </YStack>
            </XStack>
            <YStack alignItems="flex-end" gap={2}>
              <XStack gap={4} alignItems="center">
                <MaterialIcons name="check-circle" size={14} color="$tertiary" />
                <Text fontSize={11} fontWeight="700" color="$tertiary">
                  {routeSummary.status}
                </Text>
              </XStack>
              <Text fontSize={12} fontWeight="500" color="$colorHover">
                {routeSummary.arrival}
              </Text>
            </YStack>
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  );
}
