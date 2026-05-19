import React, { useRef, useEffect, useState } from 'react';
import { View } from 'react-native';
import { YStack, Text, useThemeName } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';
import type { FeatureCollection, LineString, Point } from 'geojson';

export interface MapboxMapProps {
  routeGeoJSON?: FeatureCollection<LineString>;
  originGeoJSON?: FeatureCollection<Point>;
  destinationGeoJSON?: FeatureCollection<Point>;
  zonesGeoJSON?: FeatureCollection<Point>;
  routeColor?: string;
  onLoad?: () => void;
}

const STYLES: Record<string, string> = {
  light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
};

export function MapboxMap({
  routeGeoJSON,
  originGeoJSON,
  destinationGeoJSON,
  zonesGeoJSON,
  routeColor = '#FF6B00',
  onLoad,
}: MapboxMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);
  const themeName = useThemeName();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let map: any = null;

    const init = async () => {
      try {
        const maplibregl = await import('maplibre-gl');
        if (!containerRef.current) return;

        map = new maplibregl.default.Map({
          container: containerRef.current,
          style: STYLES[themeName as keyof typeof STYLES] ?? STYLES.light,
          center: [-103.42, 20.67],
          zoom: 12,
          attributionControl: false,
        });

        map.addControl(new maplibregl.default.NavigationControl(), 'top-right');
        mapRef.current = map;

        map.on('load', () => {
          try {
            if (routeGeoJSON) {
              map.addSource('route-source', { type: 'geojson', data: routeGeoJSON });
              map.addLayer({
                id: 'route-line',
                type: 'line',
                source: 'route-source',
                paint: {
                  'line-color': routeColor,
                  'line-width': 5,
                  'line-opacity': 0.85,
                },
              });
            }

            if (originGeoJSON) {
              map.addSource('origin-source', { type: 'geojson', data: originGeoJSON });
              map.addLayer({
                id: 'origin-circle',
                type: 'circle',
                source: 'origin-source',
                paint: {
                  'circle-radius': 8,
                  'circle-color': '#6200EE',
                  'circle-stroke-width': 3,
                  'circle-stroke-color': '#FFFFFF',
                },
              });
            }

            if (destinationGeoJSON) {
              map.addSource('dest-source', { type: 'geojson', data: destinationGeoJSON });
              map.addLayer({
                id: 'dest-circle',
                type: 'circle',
                source: 'dest-source',
                paint: {
                  'circle-radius': 10,
                  'circle-color': '#FF6B00',
                  'circle-stroke-width': 3,
                  'circle-stroke-color': '#FFFFFF',
                },
              });
              map.addLayer({
                id: 'dest-label',
                type: 'symbol',
                source: 'dest-source',
                layout: {
                  'text-field': 'Estadio Akron',
                  'text-size': 12,
                  'text-offset': [0, -2],
                },
                paint: {
                  'text-color': '#FFFFFF',
                  'text-halo-color': '#000000',
                  'text-halo-width': 2,
                },
              });
            }

            if (zonesGeoJSON) {
              map.addSource('zones-source', { type: 'geojson', data: zonesGeoJSON });
              map.addLayer({
                id: 'zones-circle',
                type: 'circle',
                source: 'zones-source',
                paint: {
                  'circle-radius': 7,
                  'circle-color': '#6200EE',
                  'circle-stroke-width': 2,
                  'circle-stroke-color': '#FFFFFF',
                  'circle-opacity': 0.85,
                },
              });
              map.addLayer({
                id: 'zones-label',
                type: 'symbol',
                source: 'zones-source',
                layout: {
                  'text-field': ['get', 'label'],
                  'text-size': 10,
                  'text-offset': [0, -1.5],
                  'text-anchor': 'bottom',
                },
                paint: {
                  'text-color': '#1A1A2E',
                  'text-halo-color': '#FFFFFF',
                  'text-halo-width': 1.5,
                },
              });
            }
          } catch (e) {
            console.warn('Map layers error:', e);
          }

          setLoaded(true);
          onLoad?.();
        });
      } catch (e) {
        console.warn('maplibre-gl init error:', e);
        setLoaded(true);
      }
    };

    init();

    return () => {
      map?.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !routeGeoJSON) return;
    try {
      const map = mapRef.current;
      const source = map.getSource('route-source');
      if (source) {
        source.setData(routeGeoJSON);
        map.setPaintProperty('route-line', 'line-color', routeColor);
      }
    } catch {}
  }, [routeGeoJSON, routeColor]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    const currentStyle = STYLES[themeName as keyof typeof STYLES] ?? STYLES.light;
    const existing = map.getStyle()?.sprite;
    if (existing && !currentStyle.includes(existing)) {
      map.setStyle(currentStyle);
    }
  }, [themeName]);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      {!loaded && (
        <YStack position="absolute" inset={0} backgroundColor="#D6CCE0" justifyContent="center" alignItems="center">
          <MaterialIcons name="map" size={48} color="#6200EE" opacity={0.4} />
          <Text fontSize={13} color="$colorHover" marginTop="$2">Cargando mapa...</Text>
        </YStack>
      )}
    </View>
  );
}
