import { MaterialIcons } from "@expo/vector-icons";
import type { FeatureCollection, LineString, Point } from "geojson";
import React from "react";
import { Text, XStack, YStack } from "tamagui";
import { MapboxMap } from "./MapboxMap";

interface RouteSummary {
  line: string;
  duration: string;
  status: string;
  statusColor: string;
  arrival: string;
}

interface InteractiveMapContainerProps {
  routeSummary?: RouteSummary;
  height?: number;
  routeGeoJSON?: FeatureCollection<LineString>;
  originGeoJSON?: FeatureCollection<Point>;
  destinationGeoJSON?: FeatureCollection<Point>;
  zonesGeoJSON?: FeatureCollection<Point>;
  routeColor?: string;
}

function FloatingButton({
  icon,
  onPress,
}: {
  icon: string;
  onPress?: () => void;
}) {
  return (
    <XStack
      width={44}
      height={44}
      borderRadius="$5"
      backgroundColor="$surfaceLowest"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      pressStyle={{ opacity: 0.75, scale: 0.92 }}
      onPress={onPress}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <MaterialIcons name={icon as any} size={22} color="$colorHover" />
    </XStack>
  );
}

export function InteractiveMapContainer({
  routeSummary = {
    line: "C121",
    duration: "32",
    status: "A tiempo",
    statusColor: "#026948",
    arrival: "Llegada 18:45",
  },
  height,
  routeGeoJSON,
  originGeoJSON,
  destinationGeoJSON,
  zonesGeoJSON,
  routeColor,
}: InteractiveMapContainerProps) {
  return (
    <YStack
      position="relative"
      width="100%"
      height={height ?? 260}
      $gtMd={{ height: 340 }}
      overflow="hidden"
      borderRadius="$6"
    >
      <MapboxMap
        routeGeoJSON={routeGeoJSON}
        originGeoJSON={originGeoJSON}
        destinationGeoJSON={destinationGeoJSON}
        zonesGeoJSON={zonesGeoJSON}
        routeColor={routeColor}
      />

      <YStack position="absolute" top="$4" right="$4" gap="$2" zIndex={10}>
        <FloatingButton icon="layers" />
        <FloatingButton icon="my-location" />
      </YStack>

      <YStack position="absolute" bottom="$4" left="$4" right="$4" zIndex={10}>
        <YStack
          backgroundColor="$surfaceLowest"
          borderRadius="$5"
          padding="$4"
          gap="$2"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 16,
            elevation: 6,
          }}
        >
          <XStack justifyContent="space-between" alignItems="center">
            <Text
              fontSize={11}
              fontWeight="700"
              color="$colorHover"
              textTransform="uppercase"
              letterSpacing={1}
            >
              Ruta Sugerida
            </Text>
            <XStack gap={4} alignItems="center">
              <MaterialIcons
                name="check-circle"
                size={14}
                color={routeSummary.statusColor}
              />
              <Text
                fontSize={11}
                fontWeight="700"
                color={routeSummary.statusColor}
              >
                {routeSummary.status}
              </Text>
            </XStack>
          </XStack>
          <XStack justifyContent="space-between" alignItems="baseline">
            <XStack alignItems="baseline" gap={2}>
              <Text
                fontFamily="$heading"
                fontSize={22}
                fontWeight="800"
                color="$color"
                lineHeight={26}
                letterSpacing={1}
              >
                {routeSummary.line}
              </Text>
              <Text fontSize={15} fontWeight="700" color="$colorHover">
                — {routeSummary.duration} min
              </Text>
            </XStack>
            <Text fontSize={11} fontWeight="600" color="$colorHover">
              {routeSummary.arrival}
            </Text>
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  );
}
