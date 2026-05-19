import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

export interface RouteSegment {
  type: 'bus' | 'train' | 'walk' | 'traffic';
  line?: string;
  duration?: string;
  color?: string;
  icon?: string;
}

export interface AlternativeRouteData {
  id: string;
  duration: number;
  departureLabel?: string;
  badges?: { label: string; variant: 'primary' | 'secondary' | 'error' | 'success' }[];
  walkTime: number;
  segments: RouteSegment[];
}

interface AlternativeRouteCardProps {
  route: AlternativeRouteData;
  onPress?: () => void;
  selected?: boolean;
}

function SegmentBadge({ segment }: { segment: RouteSegment }) {
  if (segment.type === 'walk') {
    return (
      <XStack gap={4} alignItems="center">
        <MaterialIcons name="directions-walk" size={16} color="$colorHover" />
        <Text fontSize={12} fontWeight="500" color="$colorHover">
          {segment.duration}
        </Text>
      </XStack>
    );
  }

  if (segment.type === 'traffic') {
    return (
      <XStack gap={4} alignItems="center">
        <MaterialIcons name="traffic" size={14} color="$error" />
        <Text fontSize={11} fontWeight="700" color="$error">
          {segment.duration}
        </Text>
      </XStack>
    );
  }

  const icon = segment.type === 'train' ? 'train' : 'directions-bus';
  const color = segment.color ?? (segment.type === 'train' ? '$primary' : '$secondary');

  return (
    <XStack
      backgroundColor="$surface"
      paddingHorizontal={10}
      paddingVertical={5}
      borderRadius={10}
      borderWidth={1}
      borderColor="rgba(0,0,0,0.04)"
      gap={6}
      alignItems="center"
    >
      <MaterialIcons name={icon as any} size={16} color={color} />
      <Text fontSize={12} fontWeight="700" color="$color">
        {segment.line}
      </Text>
    </XStack>
  );
}

export function AlternativeRouteCard({ route, onPress, selected }: AlternativeRouteCardProps) {
  return (
    <YStack
      backgroundColor="$surfaceLowest"
      padding="$5"
      borderRadius={24}
      borderWidth={2}
      borderColor={selected ? '$secondary' : 'rgba(0,0,0,0.04)'}
      pressStyle={selected ? { opacity: 0.9 } : { opacity: 0.85, borderColor: '$secondary' }}
      cursor="pointer"
      onPress={onPress}
      gap={16}
    >
      <XStack justifyContent="space-between" alignItems="flex-start">
        <XStack gap="$2" alignItems="center" flexWrap="wrap">
          {route.badges?.map((badge, i) => {
            const badgeColors = {
              primary: { bg: '$primaryContainer', color: '$color' },
              secondary: { bg: '$secondaryContainer', color: '$color' },
              error: { bg: '$errorContainer', color: '$onError' },
              success: { bg: '$tertiaryContainer', color: '$tertiary' },
            };
            const c = badgeColors[badge.variant];
            return (
              <XStack
                key={i}
                backgroundColor={c.bg}
                paddingHorizontal={10}
                paddingVertical={3}
                borderRadius="$10"
              >
                <Text fontSize={11} fontWeight="700" color={c.color} textTransform="uppercase" letterSpacing={0.5}>
                  {badge.label}
                </Text>
              </XStack>
            );
          })}
          {route.departureLabel && (
            <Text fontSize={12} fontWeight="500" color="$colorHover">
              {route.departureLabel}
            </Text>
          )}
        </XStack>
        <XStack alignItems="baseline" gap={2}>
          <Text fontSize={20} fontWeight="800" color="$color" lineHeight={22}>
            {route.duration}
          </Text>
          <Text fontSize={13} fontWeight="400" color="$colorHover">
            min
          </Text>
        </XStack>
      </XStack>

      <XStack gap="$3" alignItems="center" flexWrap="wrap">
        <XStack gap={4} alignItems="center">
          <MaterialIcons name="directions-walk" size={16} color="$colorHover" />
          <Text fontSize={12} fontWeight="500" color="$colorHover">
            {route.walkTime} min
          </Text>
        </XStack>

        {route.segments.map((segment, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <MaterialIcons
                name={segment.type === 'traffic' ? 'chevron-right' : 'chevron-right'}
                size={14}
                color="$outline"
                opacity={0.5}
              />
            )}
            <SegmentBadge segment={segment} />
          </React.Fragment>
        ))}
      </XStack>
    </YStack>
  );
}
