import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

type BentoVariant = 'match' | 'fanzone' | 'cultural';

interface BaseBentoProps {
  variant: BentoVariant;
  title: string;
  location?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

interface MatchBentoProps extends BaseBentoProps {
  variant: 'match';
  teamALogo?: string;
  teamBLogo?: string;
  dateLabel: string;
  phaseLabel?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
}

interface FanZoneBentoProps extends BaseBentoProps {
  variant: 'fanzone';
  imageUrl?: string;
  priceLabel?: string;
  badgeLabel?: string;
  actionLabel?: string;
}

interface CulturalBentoProps extends BaseBentoProps {
  variant: 'cultural';
  icon?: string;
  subtitle?: string;
  description: string;
  actionLabel?: string;
}

type BentoEventCardProps = MatchBentoProps | FanZoneBentoProps | CulturalBentoProps;

export function BentoEventCard(props: BentoEventCardProps) {
  return (
    <YStack
      backgroundColor="$surfaceLowest"
      borderRadius="$7"
      padding="$6"
      gap="$5"
      $gtMd={{ padding: "$7", gap: "$6" }}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 2,
      }}
    >
      {props.variant === 'match' && <MatchContent {...props} />}
      {props.variant === 'fanzone' && <FanZoneContent {...props} />}
      {props.variant === 'cultural' && <CulturalContent {...props} />}
    </YStack>
  );
}

function MatchContent({
  title, location, dateLabel, phaseLabel,
  primaryActionLabel = 'Ver Ruta',
  secondaryActionLabel = 'Tickets',
  onPrimaryAction, onSecondaryAction,
}: MatchBentoProps) {
  return (
    <>
      <XStack justifyContent="space-between" alignItems="flex-start">
        <XStack gap={-12}>
          <TeamLogoIcon label="🇲🇽" />
          <TeamLogoIcon label="🇿🇦" />
        </XStack>
        <YStack alignItems="flex-end" gap={2}>
          <Text fontSize={10} fontWeight="900" color="$secondary" textTransform="uppercase" letterSpacing={1.5}>
            {dateLabel}
          </Text>
          {phaseLabel && (
            <Text fontSize={11} fontWeight="700" color="$colorHover">
              {phaseLabel}
            </Text>
          )}
        </YStack>
      </XStack>
      <YStack gap={6}>
        <Text fontFamily="$heading" fontSize={18} fontWeight="700" color="$color" lineHeight={22} letterSpacing={0.3}>
          {title}
        </Text>
        {location && (
          <XStack gap={4} alignItems="center">
            <MaterialIcons name="location-on" size={14} color="$colorHover" />
            <Text fontSize={13} color="$colorHover" lineHeight={18}>{location}</Text>
          </XStack>
        )}
      </YStack>
      <XStack gap="$3" paddingTop="$1">
        <ActionButton flex label={primaryActionLabel} onPress={onPrimaryAction} variant="secondary" />
        <ActionButton flex label={secondaryActionLabel} onPress={onSecondaryAction} variant="primary" />
      </XStack>
    </>
  );
}

function FanZoneContent({
  title, location, priceLabel, badgeLabel = 'Fan Zone',
  actionLabel = 'Cómo llegar',
  onPrimaryAction,
}: FanZoneBentoProps) {
  return (
    <>
      <YStack
        height={140}
        borderRadius="$5"
        overflow="hidden"
        backgroundColor="$secondaryContainer"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <YStack position="absolute" opacity={0.15} style={{ transform: [{ rotate: '-8deg' }] }}>
          <MaterialIcons name="festival" size={80} color="$secondary" />
        </YStack>
        <XStack position="absolute" top="$3" left="$3" backgroundColor="white" paddingHorizontal={10} paddingVertical={5} borderRadius="$10"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 }}
        >
          <Text fontSize={10} fontWeight="900" color="$secondary" textTransform="uppercase" letterSpacing={1}>
            {badgeLabel}
          </Text>
        </XStack>
        <MaterialIcons name="festival" size={48} color="$secondary" opacity={0.4} />
      </YStack>
      <YStack gap={6}>
        <Text fontFamily="$heading" fontSize={18} fontWeight="700" color="$color" lineHeight={22} letterSpacing={0.3}>
          {title}
        </Text>
        {priceLabel && (
          <Text fontSize={11} fontWeight="700" color="$primary" textTransform="uppercase" letterSpacing={0.5}>
            {priceLabel}
          </Text>
        )}
        {location && (
          <XStack gap={4} alignItems="center">
            <MaterialIcons name="location-on" size={14} color="$colorHover" />
            <Text fontSize={13} color="$colorHover" lineHeight={18}>{location}</Text>
          </XStack>
        )}
      </YStack>
      <ActionButton label={actionLabel} onPress={onPrimaryAction} variant="gradient" />
    </>
  );
}

function CulturalContent({
  title, subtitle, description, icon = 'palette',
  actionLabel = 'Más Información',
  onPrimaryAction,
}: CulturalBentoProps) {
  return (
    <>
      <XStack gap="$4" alignItems="center">
        <XStack
          width={60}
          height={60}
          borderRadius="$5"
          backgroundColor="rgba(2,105,72,0.1)"
          justifyContent="center"
          alignItems="center"
        >
          <MaterialIcons name={icon as any} size={28} color="$tertiary" />
        </XStack>
        <YStack gap={2} flex={1}>
          <Text fontFamily="$heading" fontSize={18} fontWeight="700" color="$color" lineHeight={22} letterSpacing={0.3}>
            {title}
          </Text>
          {subtitle && (
            <Text fontSize={10} fontWeight="900" color="$colorHover" textTransform="uppercase" letterSpacing={1}>
              {subtitle}
            </Text>
          )}
        </YStack>
      </XStack>
      <Text fontSize={13} color="$colorHover" lineHeight={20} numberOfLines={3}>
        {description}
      </Text>
      <ActionButton label={actionLabel} onPress={onPrimaryAction} variant="secondary" />
    </>
  );
}

function TeamLogoIcon({ label }: { label: string }) {
  return (
    <XStack
      width={52}
      height={52}
      borderRadius="$5"
      backgroundColor="$surface"
      justifyContent="center"
      alignItems="center"
      borderWidth={3}
      borderColor="$surfaceLowest"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <Text fontSize={22}>{label}</Text>
    </XStack>
  );
}

function ActionButton({
  label, onPress, variant, flex,
}: {
  label: string;
  onPress?: () => void;
  variant: 'primary' | 'secondary' | 'gradient';
  flex?: boolean;
}) {
  const bg = variant === 'primary'
    ? '$primaryContainer'
    : variant === 'gradient'
    ? '$secondary'
    : '$surface';

  const textColor = variant === 'primary'
    ? '$primary'
    : variant === 'gradient'
    ? 'white'
    : '$color';

  const extra = variant === 'gradient'
    ? {
        shadowColor: '#6200EE',
        shadowOffset: { width: 0, height: 4 } as any,
        shadowOpacity: 0.3,
        shadowRadius: 12,
      }
    : {};

  return (
    <XStack
      flex={flex ? 1 : undefined}
      backgroundColor={bg}
      paddingVertical={13}
      paddingHorizontal={flex ? undefined : '$6'}
      borderRadius="$5"
      justifyContent="center"
      alignItems="center"
      minHeight={44}
      cursor="pointer"
      pressStyle={{ opacity: 0.85, scale: 0.97 }}
      onPress={onPress}
      {...extra}
    >
      <Text fontSize={11} fontWeight="700" color={textColor} textTransform="uppercase" letterSpacing={1}>
        {label}
      </Text>
    </XStack>
  );
}
