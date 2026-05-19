import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

interface FeaturedEventHeroProps {
  teamA?: string;
  teamB?: string;
  stadium?: string;
  countdown?: string;
  onPlanRoute?: () => void;
}

export function FeaturedEventHero({
  teamA = 'México',
  teamB = 'Sudáfrica',
  stadium = 'Estadio Akron',
  countdown = 'Inicia en 45:12',
  onPlanRoute,
}: FeaturedEventHeroProps) {
  return (
    <YStack
      width="100%"
      aspectRatio={16 / 10}
      $gtMd={{ aspectRatio: 21 / 9 }}
      borderRadius={24}
      overflow="hidden"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
        elevation: 10,
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#3B1D8F', '#5D00E3', '#7B3FE0']}
        style={{ position: 'absolute', inset: 0 }}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['transparent', 'rgba(255,107,0,0.15)']}
        style={{ position: 'absolute', inset: 0 }}
      />
      <YStack position="absolute" inset={0} opacity={0.06}>
        <YStack position="absolute" top={-40} right={-30} width={200} height={200} borderRadius={100} backgroundColor="$primary" />
        <YStack position="absolute" bottom={-20} left={-20} width={140} height={140} borderRadius={70} backgroundColor="white" />
      </YStack>

      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['transparent', 'rgba(0,0,0,0.75)']}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%' }}
      />

      <YStack
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        padding="$6"
        gap={16}
        $gtMd={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', padding: "$8" }}
      >
        <YStack gap={12} flex={1}>
          <XStack gap="$2" alignItems="center">
            <XStack
              backgroundColor="#DC2626"
              paddingHorizontal={10}
              paddingVertical={4}
              borderRadius="$10"
              gap={5}
              alignItems="center"
            >
              <YStack width={6} height={6} borderRadius={3} backgroundColor="white" />
              <Text fontSize={10} fontWeight="900" color="white" textTransform="uppercase" letterSpacing={1.5}>
                LIVE
              </Text>
            </XStack>
            <XStack
              backgroundColor="$secondary"
              paddingHorizontal={10}
              paddingVertical={4}
              borderRadius="$10"
            >
              <Text fontSize={10} fontWeight="900" color="white" textTransform="uppercase" letterSpacing={1.5}>
                World Cup 2026
              </Text>
            </XStack>
          </XStack>

          <Text
            fontFamily="$heading"
            fontSize={28}
            fontWeight="800"
            color="white"
            lineHeight={32}
            letterSpacing={-0.5}
            $gtMd={{ fontSize: 44, lineHeight: 48 }}
          >
            {teamA} <Text color="$primary">vs</Text> {teamB}
          </Text>

          <XStack gap="$5" flexWrap="wrap">
            <XStack gap="$2" alignItems="center">
              <MaterialIcons name="stadium" size={16} color="#FF6B00" />
              <Text fontSize={12} fontWeight="700" color="rgba(255,255,255,0.9)" textTransform="uppercase" letterSpacing={0.5}>
                {stadium}
              </Text>
            </XStack>
            <XStack gap="$2" alignItems="center">
              <MaterialIcons name="schedule" size={16} color="#FF6B00" />
              <Text fontSize={12} fontWeight="700" color="rgba(255,255,255,0.9)" textTransform="uppercase" letterSpacing={0.5}>
                {countdown}
              </Text>
            </XStack>
          </XStack>
        </YStack>

        <XStack
          alignSelf="flex-start"
          $gtMd={{ alignSelf: 'flex-end' }}
          backgroundColor="$primary"
          paddingHorizontal="$6"
          paddingVertical="$4"
          borderRadius="$10"
          gap="$2"
          alignItems="center"
          minHeight={48}
          pressStyle={{ opacity: 0.85, scale: 0.97 }}
          cursor="pointer"
          onPress={onPlanRoute}
          style={{
            shadowColor: '#FF6B00',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.35,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <Text color="white" fontWeight="700" fontSize={13} letterSpacing={0.5}>
            PLANEAR RUTA
          </Text>
          <MaterialIcons name="directions-bus" size={18} color="white" />
        </XStack>
      </YStack>
    </YStack>
  );
}
