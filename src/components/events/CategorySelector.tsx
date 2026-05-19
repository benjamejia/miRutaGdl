import React from 'react';
import { ScrollView, XStack, Text } from 'tamagui';

const categories = ['Todos', 'Partidos', 'Fan Zones', 'Cultura', 'Infantil'] as const;

interface CategorySelectorProps {
  active: string;
  onChange: (category: string) => void;
}

export function CategorySelector({ active, onChange }: CategorySelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <XStack gap="$3" paddingVertical="$1">
        {categories.map((cat) => {
          const isActive = cat === active;
          return (
            <XStack
              key={cat}
              paddingHorizontal="$5"
              height={42}
              borderRadius="$10"
              backgroundColor={isActive ? '$secondary' : '$surfaceLowest'}
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              pressStyle={{ opacity: 0.8, scale: 0.97 }}
              onPress={() => onChange(cat)}
              borderWidth={isActive ? 0 : 1}
              borderColor="$surfaceHigh"
              style={
                isActive
                  ? {
                      shadowColor: '#6200EE',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 8,
                      elevation: 4,
                    }
                  : {}
              }
            >
              <Text
                fontSize={11}
                fontWeight="700"
                color={isActive ? 'white' : '$colorHover'}
                textTransform="uppercase"
                letterSpacing={1}
                whiteSpace="nowrap"
              >
                {cat}
              </Text>
            </XStack>
          );
        })}
      </XStack>
    </ScrollView>
  );
}
