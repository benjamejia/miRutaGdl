import React from 'react';
import { YStack, Text, useThemeName } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';
import Mapbox from '@rnmapbox/maps';
import type { FeatureCollection, LineString, Point } from 'geojson';

const MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN || '';
Mapbox.setAccessToken(MAPBOX_TOKEN);

export interface MapboxMapProps {
  routeGeoJSON?: FeatureCollection<LineString>;
  originGeoJSON?: FeatureCollection<Point>;
  destinationGeoJSON?: FeatureCollection<Point>;
  zonesGeoJSON?: FeatureCollection<Point>;
  routeColor?: string;
  onLoad?: () => void;
}

const STYLES: Record<string, string> = {
  light: 'mapbox://styles/mapbox/light-v11',
  dark: 'mapbox://styles/mapbox/dark-v11',
};

function MapError({ message }: { message: string }) {
  return (
    <YStack flex={1} backgroundColor="#D6CCE0" justifyContent="center" alignItems="center" padding="$6" gap="$2">
      <MaterialIcons name="map" size={48} color="#6200EE" opacity={0.3} />
      <Text fontSize={13} color="$colorHover" textAlign="center">{message}</Text>
    </YStack>
  );
}

export function MapboxMap({
  routeGeoJSON,
  originGeoJSON,
  destinationGeoJSON,
  zonesGeoJSON,
  routeColor = '#FF6B00',
  onLoad,
}: MapboxMapProps) {
  const themeName = useThemeName();

  if (!MAPBOX_TOKEN) {
    return <MapError message="Mapbox token no configurado. Agrega EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN en .env" />;
  }

  return (
    <Mapbox.MapView
      style={{ flex: 1 }}
      styleURL={STYLES[themeName as keyof typeof STYLES] ?? STYLES.light}
      onDidFinishLoadingMap={onLoad}
    >
      <Mapbox.Camera
        defaultSettings={{ centerCoordinate: [-103.42, 20.67], zoomLevel: 12 }}
        centerCoordinate={[-103.42, 20.67]}
        zoomLevel={12}
      />
      {routeGeoJSON && (
        <Mapbox.ShapeSource id="route-source" shape={routeGeoJSON}>
          <Mapbox.LineLayer
            id="route-line"
            style={{
              lineColor: routeColor,
              lineWidth: 5,
              lineOpacity: 0.85,
              lineCap: 'round',
              lineJoin: 'round',
            }}
          />
        </Mapbox.ShapeSource>
      )}
      {originGeoJSON && (
        <Mapbox.ShapeSource id="origin-source" shape={originGeoJSON}>
          <Mapbox.CircleLayer
            id="origin-circle"
            style={{
              circleRadius: 8,
              circleColor: '#6200EE',
              circleStrokeWidth: 3,
              circleStrokeColor: '#FFFFFF',
            }}
          />
        </Mapbox.ShapeSource>
      )}
      {destinationGeoJSON && (
        <Mapbox.ShapeSource id="dest-source" shape={destinationGeoJSON}>
          <Mapbox.CircleLayer
            id="dest-circle"
            style={{
              circleRadius: 10,
              circleColor: '#FF6B00',
              circleStrokeWidth: 3,
              circleStrokeColor: '#FFFFFF',
            }}
          />
          <Mapbox.SymbolLayer
            id="dest-label"
            style={{
              textField: 'Estadio Akron',
              textSize: 12,
              textOffset: [0, -2],
              textColor: '#FFFFFF',
              textHaloColor: '#000000',
              textHaloWidth: 2,
            }}
          />
        </Mapbox.ShapeSource>
      )}
      {zonesGeoJSON && (
        <Mapbox.ShapeSource id="zones-source" shape={zonesGeoJSON}>
          <Mapbox.CircleLayer
            id="zones-circle"
            style={{
              circleRadius: 7,
              circleColor: '#6200EE',
              circleStrokeWidth: 2,
              circleStrokeColor: '#FFFFFF',
              circleOpacity: 0.85,
            }}
          />
          <Mapbox.SymbolLayer
            id="zones-label"
            style={{
              textField: ['get', 'label'],
              textSize: 10,
              textOffset: [0, -1.5],
              textAnchor: 'bottom',
              textColor: '#1A1A2E',
              textHaloColor: '#FFFFFF',
              textHaloWidth: 1.5,
            }}
          />
        </Mapbox.ShapeSource>
      )}
    </Mapbox.MapView>
  );
}
