import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

interface HeroBannerProps {
  tag?: string;
  title: string;
  subtitle: string;
  icon?: string;
}

export function HeroBanner({ tag, title, subtitle, icon = 'sports-soccer' }: HeroBannerProps) {
  return (
    <YStack
      height={260}
      borderRadius={24}
      overflow="hidden"
      $gtSm={{ height: 300 }}
      $gtMd={{ height: 340, borderRadius: 28 }}
    >
      <LinearGradient
        start={[0, 0]}
        end={[1, 1]}
        colors={['#7B2FF7', '#5A00D6', '#4A00B0']}
        style={{ position: 'absolute', inset: 0 }}
      />
      <YStack position="absolute" inset={0} opacity={0.08}>
        <YStack
          position="absolute"
          top={-40}
          right={-30}
          width={200}
          height={200}
          borderRadius={100}
          backgroundColor="white"
        />
        <YStack
          position="absolute"
          bottom={-60}
          right={-20}
          width={160}
          height={160}
          borderRadius={80}
          backgroundColor="white"
        />
      </YStack>
      <YStack position="absolute" right={-8} bottom={-8} opacity={0.3}>
        <MaterialIcons name={icon as any} size={140} color="white" />
      </YStack>
      <YStack
        flex={1}
        justifyContent="center"
        padding="$6"
        gap={8}
        zIndex={2}
        $gtSm={{ padding: '$8' }}
      >
        {tag && (
          <XStack
            alignSelf="flex-start"
            paddingHorizontal={14}
            paddingVertical={6}
            borderRadius={20}
            backgroundColor="rgba(255,255,255,0.18)"
            borderWidth={1}
            borderColor="rgba(255,255,255,0.15)"
            gap={6}
            alignItems="center"
          >
            <YStack width={6} height={6} borderRadius={3} backgroundColor="#FF6B00" />
            <Text
              fontSize={11}
              fontWeight="800"
              color="white"
              textTransform="uppercase"
              letterSpacing={2.5}
            >
              {tag}
            </Text>
          </XStack>
        )}
        <Text
          fontFamily="$heading"
          fontSize={30}
          fontWeight="800"
          color="white"
          lineHeight={34}
          letterSpacing={-0.5}
          $gtSm={{ fontSize: 36, lineHeight: 40 }}
          $gtMd={{ fontSize: 44, lineHeight: 48 }}
        >
          {title}
        </Text>
        <Text
          color="rgba(255,255,255,0.8)"
          fontSize={14}
          lineHeight={20}
          maxWidth={280}
          $gtMd={{ fontSize: 16, maxWidth: 400 }}
        >
          {subtitle}
        </Text>
      </YStack>
    </YStack>
  );
}
