import React, { useState } from 'react';
import { YStack, XStack, Input, Button, Text } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

interface PulseSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onFocus?: () => void;
}

export function PulseSearchBar({ placeholder = '¿A dónde vas hoy?', onSearch, onFocus }: PulseSearchBarProps) {
  const [query, setQuery] = useState('');

  return (
    <YStack
      marginTop={-24}
      zIndex={20}
      paddingHorizontal={0}
      $gtMd={{ paddingHorizontal: 0 }}
    >
      <XStack
        backgroundColor="rgba(255,255,255,0.92)"
        borderRadius={20}
        padding={6}
        shadowColor="rgba(0,0,0,0.06)"
        shadowOffset={{ width: 0, height: 12 }}
        shadowOpacity={1}
        shadowRadius={32}
        borderWidth={1}
        borderColor="rgba(255,255,255,0.6)"
        alignItems="center"
        $gtMd={{ borderRadius: 24, padding: 8 }}
      >
        <XStack paddingLeft={14} paddingRight={6} justifyContent="center" alignItems="center">
          <MaterialIcons name="search" size={22} color="#FF6B00" />
        </XStack>
        <Input
          flex={1}
          borderWidth={0}
          fontSize={16}
          fontWeight="500"
          placeholder={placeholder}
          placeholderTextColor="$colorHover"
          value={query}
          onChangeText={setQuery}
          onFocus={onFocus}
          paddingHorizontal={8}
          paddingVertical={12}
          backgroundColor="transparent"
          focusStyle={{ borderWidth: 0 }}
        />
        <Button
          backgroundColor="#FF6B00"
          paddingHorizontal={20}
          height={44}
          borderRadius={16}
          onPress={() => onSearch?.(query)}
          pressStyle={{ opacity: 0.85, scale: 0.97 }}
          $gtMd={{ height: 48, borderRadius: 18 }}
        >
          <Text
            color="white"
            fontWeight="800"
            fontSize={13}
            textTransform="uppercase"
            letterSpacing={1}
          >
            Buscar
          </Text>
        </Button>
      </XStack>
    </YStack>
  );
}
