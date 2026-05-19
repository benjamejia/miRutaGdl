import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

interface DetailRow {
  icon: string;
  text: string;
}

interface EventBannerProps {
  backgroundColor: string;
  icon: React.ReactNode;
  badgeText: string;
  badgeBackgroundColor?: string;
  badgeTextColor?: string;
  title: string;
  description?: string;
  detailRows?: DetailRow[];
  ctaText: string;
  ctaBackgroundColor?: string;
  ctaTextColor?: string;
  onPress?: () => void;
}

export function EventBanner({
  backgroundColor,
  icon,
  badgeText,
  badgeBackgroundColor = 'rgba(255,255,255,0.2)',
  badgeTextColor = '#ffffff',
  title,
  description,
  detailRows,
  ctaText,
  ctaBackgroundColor = 'rgba(255,255,255,0.25)',
  ctaTextColor = '#ffffff',
  onPress,
}: EventBannerProps) {
  return (
    <YStack
      borderRadius={24}
      overflow="hidden"
      onPress={onPress}
      pressStyle={{ opacity: 0.92, scale: 0.98 }}
      backgroundColor={backgroundColor}
    >
      <XStack
        padding="$5"
        gap="$4"
        alignItems="center"
        $gtSm={{ padding: '$6' }}
        width="100%"
      >
        <YStack
          width={56}
          height={56}
          borderRadius={16}
          backgroundColor="rgba(255,255,255,0.15)"
          justifyContent="center"
          alignItems="center"
          flexShrink={0}
        >
          {icon}
        </YStack>

        <YStack flex={1} gap={6}>
          <XStack gap={8} alignItems="center">
            <YStack
              paddingHorizontal={10}
              paddingVertical={3}
              backgroundColor={badgeBackgroundColor}
              borderRadius="$10"
            >
              <Text
                fontSize={10}
                fontWeight="800"
                color={badgeTextColor}
                textTransform="uppercase"
                letterSpacing={1.2}
              >
                {badgeText}
              </Text>
            </YStack>
          </XStack>

          <Text
            fontFamily="$heading"
            fontSize={20}
            fontWeight="800"
            color="#ffffff"
            lineHeight={24}
            letterSpacing={-0.3}
          >
            {title}
          </Text>

          {description && (
            <Text fontSize={13} color="rgba(255, 255, 255, 0.8)" lineHeight={18}>
              {description}
            </Text>
          )}

          {detailRows && detailRows.length > 0 && (
            <YStack gap={4}>
              {detailRows.map((row, i) => (
                <XStack key={i} gap={6} alignItems="center">
                  <MaterialIcons
                    name={row.icon as any}
                    size={14}
                    color="rgba(255,255,255,0.7)"
                  />
                  <Text fontSize={12} color="rgba(255, 255, 255, 0.7)" fontWeight="500">
                    {row.text}
                  </Text>
                </XStack>
              ))}
            </YStack>
          )}

          <XStack gap={8} alignItems="center" marginTop={4}>
            <XStack
              backgroundColor={ctaBackgroundColor}
              paddingHorizontal={16}
              paddingVertical={8}
              borderRadius={12}
              cursor="pointer"
              gap={6}
              alignItems="center"
            >
              <Text
                fontSize={12}
                fontWeight="800"
                color={ctaTextColor}
                textTransform="uppercase"
                letterSpacing={0.8}
              >
                {ctaText}
              </Text>
              <MaterialIcons name="arrow-forward" size={16} color={ctaTextColor} />
            </XStack>
          </XStack>
        </YStack>
      </XStack>
    </YStack>
  );
}
