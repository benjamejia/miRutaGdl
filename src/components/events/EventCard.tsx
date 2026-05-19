import React from 'react';
import { YStack, XStack, Text, Button } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

interface EventCardProps {
  title: string;
  location: string;
  schedule: string;
  buttonText: string;
  buttonColor?: '$primary' | '$secondary';
  badge?: string;
  leftSection: React.ReactNode;
  onButtonPress?: () => void;
}

export function EventCard({
  title,
  location,
  schedule,
  buttonText,
  buttonColor = '$primary',
  leftSection,
  onButtonPress,
}: EventCardProps) {
  const btnColor = buttonColor === '$primary' ? '#FF6B00' : '#6200EE';

  return (
    <YStack
      backgroundColor="$surfaceLowest"
      borderRadius={20}
      overflow="hidden"
      shadowColor="rgba(0,0,0,0.04)"
      shadowOffset={{ width: 0, height: 8 }}
      shadowOpacity={1}
      shadowRadius={24}
      width="100%"
      $gtSm={{ flexDirection: 'row' }}
    >
      {leftSection}
      <YStack
        flex={1}
        padding="$5"
        justifyContent="center"
        gap={6}
        $gtSm={{ padding: '$6' }}
      >
        <Text
          fontFamily="$heading"
          fontSize={18}
          fontWeight="700"
          color="$color"
          lineHeight={22}
          $gtSm={{ fontSize: 20, lineHeight: 24 }}
          numberOfLines={2}
        >
          {title}
        </Text>
        <YStack gap={6} marginTop={8}>
          <XStack gap={8} alignItems="center">
            <YStack
              width={32}
              height={32}
              borderRadius={10}
              backgroundColor="$surface"
              justifyContent="center"
              alignItems="center"
              flexShrink={0}
            >
              <MaterialIcons name="location-on" size={16} color="#5A5C5E" />
            </YStack>
            <Text
              fontSize={13}
              color="$colorHover"
              lineHeight={18}
              numberOfLines={1}
              flex={1}
            >
              {location}
            </Text>
          </XStack>
          <XStack gap={8} alignItems="center">
            <YStack
              width={32}
              height={32}
              borderRadius={10}
              backgroundColor="$surface"
              justifyContent="center"
              alignItems="center"
              flexShrink={0}
            >
              <MaterialIcons name="schedule" size={16} color="#5A5C5E" />
            </YStack>
            <Text
              fontSize={13}
              color="$colorHover"
              lineHeight={18}
              numberOfLines={1}
              flex={1}
            >
              {schedule}
            </Text>
          </XStack>
        </YStack>
        <Button
          marginTop={8}
          backgroundColor={btnColor + '12'}
          borderRadius={14}
          height={36}
          paddingHorizontal={16}
          alignSelf="flex-start"
          onPress={onButtonPress}
          pressStyle={{ opacity: 0.7 }}
          borderWidth={1}
          borderColor={btnColor + '20'}
          $sm={{ height: 40, paddingHorizontal: 20 }}
        >
          <Text
            color={btnColor}
            fontWeight="800"
            fontSize={11}
            textTransform="uppercase"
            letterSpacing={1}
          >
            {buttonText}
          </Text>
        </Button>
      </YStack>
    </YStack>
  );
}

interface MatchSectionProps {
  teamAFlag: string;
  teamBFlag: string;
  backgroundColor: string;
  badgeText?: string;
  badgeColor?: string;
}

export function MatchSection({
  teamAFlag,
  teamBFlag,
  backgroundColor = '$primaryContainer',
  badgeText,
  badgeColor = '$secondary',
}: MatchSectionProps) {
  const bgColor = backgroundColor === '$primaryContainer' ? '#FF7A2F' : backgroundColor;
  const badge = badgeColor === '$secondary' ? '#6200EE' : badgeColor;

  return (
    <YStack
      width="100%"
      backgroundColor={bgColor}
      justifyContent="center"
      alignItems="center"
      position="relative"
      overflow="hidden"
      padding="$4"
      gap={4}
      minHeight={140}
      $gtSm={{ width: 140, minHeight: 200 }}
    >
      <YStack position="absolute" opacity={0.08} rotate="12deg" scale={1.8}>
        <MaterialIcons name="sports-soccer" size={100} color="white" />
      </YStack>
      <YStack
        width={48}
        height={48}
        borderRadius={14}
        backgroundColor="rgba(255,255,255,0.95)"
        justifyContent="center"
        alignItems="center"
        shadowColor="rgba(0,0,0,0.08)"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={1}
        shadowRadius={8}
        $gtSm={{ width: 52, height: 52 }}
      >
        <Text fontSize={20} $gtSm={{ fontSize: 22 }}>{teamAFlag}</Text>
      </YStack>
      <Text
        fontSize={10}
        fontWeight="800"
        color="rgba(255,255,255,0.9)"
        textTransform="uppercase"
        letterSpacing={2}
      >
        VS
      </Text>
      <YStack
        width={48}
        height={48}
        borderRadius={14}
        backgroundColor="rgba(255,255,255,0.95)"
        justifyContent="center"
        alignItems="center"
        shadowColor="rgba(0,0,0,0.08)"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={1}
        shadowRadius={8}
        $gtSm={{ width: 52, height: 52 }}
      >
        <Text fontSize={20} $gtSm={{ fontSize: 22 }}>{teamBFlag}</Text>
      </YStack>
      {badgeText && (
        <XStack
          marginTop={6}
          backgroundColor={badge}
          paddingHorizontal={10}
          paddingVertical={4}
          borderRadius={8}
        >
          <Text
            fontSize={9}
            fontWeight="900"
            color="white"
            textTransform="uppercase"
            letterSpacing={1.5}
          >
            {badgeText}
          </Text>
        </XStack>
      )}
    </YStack>
  );
}

interface FanZoneSectionProps {
  icon?: string;
  label?: string;
  backgroundColor?: string;
}

export function FanZoneSection({
  icon = 'music-note',
  label = 'Fan Zone',
  backgroundColor = '$secondaryContainer',
}: FanZoneSectionProps) {
  const bgColor = backgroundColor === '$secondaryContainer' ? '#D9CAFF' : backgroundColor;

  return (
    <YStack
      width="100%"
      backgroundColor={bgColor}
      justifyContent="center"
      alignItems="center"
      position="relative"
      overflow="hidden"
      padding="$4"
      gap={8}
      minHeight={140}
      $gtSm={{ width: 140, minHeight: 200 }}
    >
      <YStack position="absolute" opacity={0.06} rotate="-12deg" scale={1.8}>
        <MaterialIcons name="festival" size={100} color="#6200EE" />
      </YStack>
      <YStack
        width={52}
        height={52}
        borderRadius={14}
        backgroundColor="rgba(255,255,255,0.9)"
        justifyContent="center"
        alignItems="center"
        $gtSm={{ width: 56, height: 56 }}
      >
        <MaterialIcons name={icon as any} size={26} color="#6200EE" />
      </YStack>
      <Text
        fontSize={10}
        fontWeight="900"
        color="#6200EE"
        textTransform="uppercase"
        letterSpacing={2}
        textAlign="center"
      >
        {label}
      </Text>
    </YStack>
  );
}
