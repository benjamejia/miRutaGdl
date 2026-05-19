import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, subtitle, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <XStack justifyContent="space-between" alignItems="flex-end" gap="$4">
      <YStack gap={4} flex={1}>
        <Text
          fontFamily="$heading"
          fontSize={22}
          fontWeight="800"
          color="$color"
          lineHeight={26}
          $gtSm={{ fontSize: 24 }}
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text
          fontSize={13}
          color="$colorHover"
          lineHeight={18}
          $gtSm={{ fontSize: 14 }}
          numberOfLines={2}
        >
          {subtitle}
        </Text>
      </YStack>
      {actionLabel && (
        <XStack
          alignItems="center"
          gap={4}
          onPress={onAction}
          cursor="pointer"
          paddingLeft="$4"
          paddingVertical={8}
          pressStyle={{ opacity: 0.6 }}
        >
          <Text
            fontSize={13}
            fontWeight="700"
            color="$primary"
            $gtSm={{ fontSize: 14 }}
          >
            {actionLabel}
          </Text>
          <MaterialIcons name="arrow-forward" size={16} color="#FF6B00" />
        </XStack>
      )}
    </XStack>
  );
}
