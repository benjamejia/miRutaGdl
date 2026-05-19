import React from 'react';
import { XStack, Square, Text } from 'tamagui';

interface StatusBadgeProps {
  label: string;
  variant: 'success' | 'warning' | 'error';
}

const statusConfig = {
  success: { bg: 'rgba(2,105,72,0.1)', color: '#026948', dot: '#026948' },
  warning: { bg: 'rgba(255,107,0,0.1)', color: '#FF6B00', dot: '#FF6B00' },
  error: { bg: 'rgba(176,37,0,0.08)', color: '#B02500', dot: '#B02500' },
};

export function StatusBadge({ label, variant }: StatusBadgeProps) {
  const c = statusConfig[variant];
  return (
    <XStack
      backgroundColor={c.bg}
      paddingHorizontal={10}
      paddingVertical={6}
      borderRadius="$10"
      gap={6}
      alignItems="center"
      borderWidth={1}
      borderColor={c.dot + '18'}
      flexShrink={0}
    >
      <Square size={6} borderRadius="$10" backgroundColor={c.dot} />
      <Text
        fontSize={11}
        fontWeight="700"
        color={c.color}
        textTransform="uppercase"
        letterSpacing={1.5}
        numberOfLines={1}
      >
        {label}
      </Text>
    </XStack>
  );
}
