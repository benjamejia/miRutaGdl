import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';
import { LineIcon, StatusBadge } from './index';

interface TransitLine {
  id: string;
  label: string;
  name: string;
  station: string;
  color: string;
  status: 'on-time' | 'delayed' | 'maintenance';
  statusLabel: string;
}

interface TransitTickerProps {
  lines?: TransitLine[];
}

const defaultLines: TransitLine[] = [
  {
    id: 'l3',
    label: 'L3',
    name: 'Línea 3 - Tren Ligero',
    station: 'Estación Arcos de Zapopan',
    color: '#6200EE',
    status: 'on-time',
    statusLabel: 'A tiempo',
  },
  {
    id: 'mb',
    label: 'MB',
    name: 'Macrobús Periférico',
    station: 'Circuito Mundialista',
    color: '#6200EE',
    status: 'delayed',
    statusLabel: 'Demora 5 min',
  },
];

function variantFromStatus(status: string): 'success' | 'warning' | 'error' {
  switch (status) {
    case 'on-time':
      return 'success';
    case 'delayed':
      return 'error';
    case 'maintenance':
      return 'warning';
    default:
      return 'success';
  }
}

export function TransitTicker({ lines = defaultLines }: TransitTickerProps) {
  return (
    <YStack
      backgroundColor="#F0F0F3"
      borderRadius={24}
      padding="$5"
      gap={16}
      borderWidth={1}
      borderColor="rgba(0,0,0,0.04)"
      $gtSm={{ padding: '$6', gap: 20 }}
    >
      <XStack gap={10} alignItems="center">
        <XStack
          width={36}
          height={36}
          borderRadius={12}
          backgroundColor="rgba(255,107,0,0.1)"
          justifyContent="center"
          alignItems="center"
          flexShrink={0}
        >
          <MaterialIcons name="directions-bus" size={20} color="#FF6B00" />
        </XStack>
        <Text
          fontFamily="$heading"
          fontSize={18}
          fontWeight="700"
          color="$color"
          lineHeight={22}
          $gtSm={{ fontSize: 20 }}
        >
          Estado del Transporte
        </Text>
      </XStack>
      <YStack gap={10}>
        {lines.map((line) => (
          <XStack
            key={line.id}
            backgroundColor="$surfaceLowest"
            borderRadius={16}
            padding="$4"
            justifyContent="space-between"
            alignItems="center"
            borderWidth={1}
            borderColor="rgba(0,0,0,0.04)"
            shadowColor="rgba(0,0,0,0.02)"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={1}
            shadowRadius={8}
            flexWrap="nowrap"
            $sm={{ padding: 12, gap: 8 }}
          >
            <XStack gap={12} alignItems="center" flex={1} minWidth={0}>
              <LineIcon label={line.label} color={line.color} />
              <YStack gap={3} flex={1} minWidth={0}>
                <Text
                  fontSize={14}
                  fontWeight="700"
                  color="$color"
                  lineHeight={18}
                  numberOfLines={1}
                >
                  {line.name}
                </Text>
                <Text
                  fontSize={11}
                  color="$colorHover"
                  textTransform="uppercase"
                  letterSpacing={1.5}
                  lineHeight={14}
                  numberOfLines={1}
                >
                  {line.station}
                </Text>
              </YStack>
            </XStack>
            <StatusBadge label={line.statusLabel} variant={variantFromStatus(line.status)} />
          </XStack>
        ))}
      </YStack>
    </YStack>
  );
}
