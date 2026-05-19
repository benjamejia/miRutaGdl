import React from 'react';
import { YStack, XStack, Text, Button, View } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

interface BentoMatchCardProps {
  teamALabel: string; // Ejemplo: "🇲🇽"
  teamBLabel: string; // Ejemplo: "🇿🇦"
  title: string;      // Ejemplo: "México vs Sudáfrica"
  stadium: string;
  timeLabel: string;  // Ejemplo: "18:00 hrs | 14 Junio"
  isLive?: boolean;
  onAction?: () => void;
}

export function BentoMatchCard({
  teamALabel,
  teamBLabel,
  title,
  stadium,
  timeLabel,
  isLive = false,
  onAction,
}: BentoMatchCardProps) {
  return (
    <YStack
      backgroundColor="$surfaceLowest"
      borderRadius="$7"
      overflow="hidden"
      paddingBottom="$4"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 16,
        elevation: 3,
      }}
    >
      {/* Contenedor Naranja Superior */}
      <YStack
        height={160}
        backgroundColor="#FF7A30" // Color base brillante de la imagen
        justifyContent="center"
        alignItems="center"
        gap="$3"
        position="relative"
      >
        {/* Banderas Solapadas */}
        <XStack gap={-16} alignItems="center">
          <View
            width={56}
            height={56}
            borderRadius={100}
            backgroundColor="white"
            justifyContent="center"
            alignItems="center"
            style={{ elevation: 4, shadowOpacity: 0.1, shadowRadius: 4 }}
          >
            <Text fontSize={32}>{teamALabel}</Text>
          </View>
          <View
            width={56}
            height={56}
            borderRadius={100}
            backgroundColor="white"
            justifyContent="center"
            alignItems="center"
            style={{ elevation: 4, shadowOpacity: 0.1, shadowRadius: 4 }}
          >
            <Text fontSize={32}>{teamBLabel}</Text>
          </View>
        </XStack>

        {/* Badge EN VIVO */}
        {isLive && (
          <XStack
            backgroundColor="#6200EE"
            paddingHorizontal="$3"
            paddingVertical="$1"
            borderRadius="$10"
          >
            <Text fontSize={10} fontWeight="900" color="white" letterSpacing={1}>
              EN VIVO
            </Text>
          </XStack>
        )}
      </YStack>

      {/* Cuerpo de Información Inferior */}
      <YStack padding="$4" alignItems="center" gap="$3">
        <Text
          fontFamily="$heading"
          fontSize={18}
          fontWeight="800"
          color="$color"
          textAlign="center"
        >
          {title}
        </Text>

        <YStack gap="$1.5" alignItems="center">
          <XStack gap="$1.5" alignItems="center">
            <MaterialIcons name="location-on" size={14} color="$colorHover" />
            <Text fontSize={13} color="$colorHover" fontWeight="500">
              {stadium}
            </Text>
          </XStack>
          <XStack gap="$1.5" alignItems="center">
            <MaterialIcons name="access-time" size={14} color="$colorHover" />
            <Text fontSize={13} color="$colorHover" fontWeight="500">
              {timeLabel}
            </Text>
          </XStack>
        </YStack>

        {/* Botón de Acción Estilizado */}
        <Button
          backgroundColor="#EBE6FF"
          pressStyle={{ opacity: 0.8, scale: 0.98 }}
          borderRadius="$10"
          width="70%"
          height={40}
          onPress={onAction}
        >
          <Text color="#6200EE" fontWeight="800" fontSize={11} letterSpacing={0.8}>
            COMO LLEGAR
          </Text>
        </Button>
      </YStack>
    </YStack>
  );
}