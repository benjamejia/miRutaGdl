import React from 'react';
import { Square, Text } from 'tamagui';

interface LineIconProps {
  label: string;
  color: string;
}

export function LineIcon({ label, color }: LineIconProps) {
  return (
    <Square
      size={42}
      backgroundColor={color + '12'}
      borderRadius={12}
      justifyContent="center"
      alignItems="center"
      borderWidth={1}
      borderColor={color + '20'}
      flexShrink={0}
      $sm={{ size: 36 }}
    >
      <Text
        fontSize={15}
        fontWeight="800"
        color={color}
        letterSpacing={1}
        $sm={{ fontSize: 13 }}
      >
        {label}
      </Text>
    </Square>
  );
}
