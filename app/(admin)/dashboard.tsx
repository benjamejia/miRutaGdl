import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { ActivityIndicator, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, YStack, XStack, Text, useThemeName } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchDashboardData, subscribeToKPI, toHeatmapGeoJSON, toRouteGeoJSON } from '../../src/services/dashboard';
import type { DashboardData, KPISummary, ZoneFlow, TransportMode, HeatmapPoint, RouteLine } from '../../src/types/dashboard';

const C = {
  bg: '#111111',
  card: '#1C1C1E',
  border: '#2A2A2D',
  text: '#E1E2E6',
  textDim: '#8B8D8F',
  textBright: '#FFFFFF',
  orange: '#FF6B00',
  purple: '#6200EE',
  green: '#026948',
  purpleLight: '#CCB9FF',
  yellow: '#F5C518',
  red: '#B02500',
  chartBlue: '#4A6CF7',
};

const CARD_RADIUS = 16;
const BENTO_GAP = 24;

// ─── Metric Card ─────────────────────────────────────────────────────────────
interface MetricCardProps {
  icon: string;
  iconColor: string;
  label: string;
  value: string;
  subtitle: string;
  accentColor?: string;
  trend?: 'up' | 'down' | 'neutral';
  onPress?: () => void;
  active?: boolean;
}

function MetricCard({ icon, iconColor, label, value, subtitle, accentColor, trend, onPress, active }: MetricCardProps) {
  return (
    <YStack
      flex={1}
      minWidth={140}
      backgroundColor={C.card}
      borderRadius={CARD_RADIUS}
      borderWidth={1}
      borderColor={active ? iconColor : C.border}
      padding="$4"
      gap="$2"
      cursor={onPress ? 'pointer' : undefined}
      pressStyle={onPress ? { opacity: 0.85, borderColor: iconColor } : undefined}
      onPress={onPress}
    >
      <XStack gap="$2" alignItems="center">
        <XStack
          width={36} height={36} borderRadius={10}
          backgroundColor={`${iconColor}18`}
          justifyContent="center" alignItems="center"
        >
          <MaterialIcons name={icon as any} size={20} color={iconColor} />
        </XStack>
        <YStack flex={1}>
          <Text fontSize={12} fontWeight="600" color={C.textDim} textTransform="uppercase" letterSpacing={0.6}>
            {label}
          </Text>
          {onPress && (
            <Text fontSize={9} fontWeight="500" color={iconColor} opacity={0.7}>
              Toca para explorar
            </Text>
          )}
        </YStack>
      </XStack>
      <Text fontSize={28} fontWeight="900" color={accentColor ?? C.textBright} letterSpacing={0.5}>
        {value}
      </Text>
      <XStack gap="$1" alignItems="center">
        {trend && trend !== 'neutral' && (
          <MaterialIcons
            name={trend === 'up' ? 'trending-up' : 'trending-down'}
            size={14}
            color={trend === 'up' ? C.green : C.red}
          />
        )}
        <Text fontSize={12} fontWeight="500" color={C.textDim}>
          {subtitle}
        </Text>
      </XStack>
    </YStack>
  );
}

// ─── Bar Chart ───────────────────────────────────────────────────────────────
function VerticalBarChart({ data }: { data: ZoneFlow[] }) {
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const BAR_CONTAINER_H = 140;
  const barW = Math.min(44, (Dimensions.get('window').width - 100) / data.length - 6);

  return (
    <YStack gap="$3">
      <XStack gap="$2" alignItems="center">
        <MaterialIcons name="bar-chart" size={18} color={C.chartBlue} />
        <Text fontSize={14} fontWeight="700" color={C.text}>Flujo por zona</Text>
      </XStack>
      <YStack height={BAR_CONTAINER_H + 28} overflow="hidden">
        <XStack flex={1} alignItems="flex-end" gap="$2">
          {data.map((item) => {
            const h = Math.max(4, (item.value / maxVal) * (BAR_CONTAINER_H - 8));
            return (
              <YStack key={item.label} flex={1} alignItems="center" gap="$1">
                <Text fontSize={10} fontWeight="700" color={C.textDim}>
                  {(item.value / 1000).toFixed(1)}k
                </Text>
                <YStack width={barW} height={h} borderRadius={6} backgroundColor={C.chartBlue} opacity={0.85} />
                <Text fontSize={10} fontWeight="500" color={C.textDim} numberOfLines={1}>
                  {item.label}
                </Text>
              </YStack>
            );
          })}
        </XStack>
      </YStack>
    </YStack>
  );
}

// ─── Donut Chart ─────────────────────────────────────────────────────────────
function DonutChart({ data }: { data: TransportMode[] }) {
  const top = data[0];
  return (
    <YStack gap="$3">
      <XStack gap="$2" alignItems="center">
        <MaterialIcons name="donut-small" size={18} color={C.purpleLight} />
        <Text fontSize={14} fontWeight="700" color={C.text}>Moda de transporte</Text>
      </XStack>
      <XStack gap="$5" alignItems="center">
        <YStack width={120} height={120} borderRadius={60} borderWidth={16} borderColor={top.color}
          justifyContent="center" alignItems="center" backgroundColor={`${top.color}08`}
        >
          <Text fontSize={26} fontWeight="900" color={top.color}>{top.percentage}%</Text>
          <Text fontSize={9} fontWeight="600" color={C.textDim} numberOfLines={1} adjustsFontSizeToFit>{top.name}</Text>
        </YStack>
        <YStack flex={1} gap="$2.5">
          <XStack height={8} borderRadius={4} overflow="hidden">
            {data.map((seg) => (
              <YStack key={seg.name} flex={seg.percentage} backgroundColor={seg.color} />
            ))}
          </XStack>
          <YStack gap="$1.5">
            {data.map((item) => (
              <XStack key={item.name} gap="$2" alignItems="center">
                <YStack width={8} height={8} borderRadius={4} backgroundColor={item.color} />
                <XStack flex={1} alignItems="center" justifyContent="space-between">
                  <Text fontSize={11} fontWeight="500" color={C.textDim} numberOfLines={1} flex={1}>{item.name}</Text>
                  <Text fontSize={12} fontWeight="700" color={C.text}>{item.percentage}%</Text>
                </XStack>
              </XStack>
            ))}
          </YStack>
        </YStack>
      </XStack>
    </YStack>
  );
}

// ─── Bento Card ──────────────────────────────────────────────────────────────
function BentoCard({ children }: { children: React.ReactNode }) {
  return (
    <YStack backgroundColor={C.card} borderRadius={CARD_RADIUS} borderWidth={1} borderColor={C.border} padding="$4" gap="$3">
      {children}
    </YStack>
  );
}

// ─── Loading / Error / Empty ─────────────────────────────────────────────────
function DashboardSkeleton() {
  return (
    <YStack padding="$4" gap="$5" maxWidth={1200} alignSelf="center" width="100%">
      <XStack gap="$4">
        {[1, 2, 3].map((i) => (
          <YStack key={i} flex={1} backgroundColor={C.card} borderRadius={CARD_RADIUS} padding="$4" gap="$2">
            <YStack height={14} width={100} borderRadius={6} backgroundColor={C.border} />
            <YStack height={28} width={70} borderRadius={6} backgroundColor={C.border} />
            <YStack height={12} width={110} borderRadius={6} backgroundColor={C.border} />
          </YStack>
        ))}
      </XStack>
      <YStack height={300} backgroundColor={C.card} borderRadius={CARD_RADIUS} />
    </YStack>
  );
}

function DashboardError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" gap="$4" padding="$8">
      <MaterialIcons name="cloud-off" size={56} color={C.red} opacity={0.6} />
      <Text fontSize={15} fontWeight="600" color={C.textDim} textAlign="center">{message}</Text>
      <XStack paddingHorizontal="$6" paddingVertical="$3" borderRadius={12} backgroundColor={C.orange}
        cursor="pointer" pressStyle={{ opacity: 0.8 }} onPress={onRetry}
      >
        <Text fontSize={13} fontWeight="700" color="#FFFFFF" textTransform="uppercase">Reintentar</Text>
      </XStack>
    </YStack>
  );
}

function DashboardEmpty() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" gap="$3" padding="$8">
      <MaterialIcons name="info-outline" size={48} color={C.textDim} opacity={0.4} />
      <Text fontSize={14} fontWeight="600" color={C.textDim} textAlign="center">
        No hay datos disponibles. Verifica la conexión con Supabase.
      </Text>
    </YStack>
  );
}

// ─── Route Breakdown Panel ───────────────────────────────────────────────────
function RouteBreakdownPanel({ routes, onClose }: { routes: RouteLine[]; onClose: () => void }) {
  return (
    <YStack
      backgroundColor={C.card} borderRadius={12} borderWidth={1} borderColor={C.orange}
      padding="$3" gap="$2"
    >
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={13} fontWeight="700" color={C.text}>Rutas activas · {routes.length}</Text>
        <XStack width={28} height={28} borderRadius={8} justifyContent="center" alignItems="center"
          cursor="pointer" pressStyle={{ opacity: 0.6 }} onPress={onClose}
        >
          <MaterialIcons name="close" size={18} color={C.textDim} />
        </XStack>
      </XStack>
      {routes.map((r) => (
        <XStack key={r.id} gap="$2" alignItems="center">
          <YStack width={4} height={20} borderRadius={2} backgroundColor={r.color} />
          <Text fontSize={11} fontWeight="600" color={C.textDim} flex={1}>{r.label}</Text>
          <XStack gap={1} alignItems="center">
            <YStack width={6} height={6} borderRadius={3} backgroundColor={r.color} />
          </XStack>
        </XStack>
      ))}
    </YStack>
  );
}

// ─── Heatmap Map Card ────────────────────────────────────────────────────────
interface HeatmapMapCardProps {
  heatmapPoints: HeatmapPoint[];
  routeLines?: RouteLine[];
  showRouteLines?: boolean;
  mapHeight?: number;
  onPointClick?: (point: HeatmapPoint) => void;
}

function HeatmapMapCard({ heatmapPoints, routeLines, showRouteLines, mapHeight, onPointClick }: HeatmapMapCardProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const popupRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);
  const themeName = useThemeName();

  const mh = mapHeight ?? 280;
  const heatmapGeoJSON = useMemo(() => toHeatmapGeoJSON(heatmapPoints), [heatmapPoints]);
  const routeGeoJSON = useMemo(() => toRouteGeoJSON(routeLines ?? []), [routeLines]);

  // Initialize map
  useEffect(() => {
    if (Platform.OS !== 'web' || !mapContainer.current) return;
    let cancelled = false;

    (async () => {
      const maplibregl = await import('maplibre-gl');
      if (cancelled || !mapContainer.current) return;

      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: themeName === 'dark'
          ? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
          : 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        center: [-103.38, 20.665],
        zoom: 11.2,
        attributionControl: false,
        interactive: true,
      });

      map.on('load', () => {
        if (cancelled) { map.remove(); return; }

        // Heatmap source + layer
        map.addSource('heatmap-data', { type: 'geojson', data: heatmapGeoJSON as any });
        map.addLayer({
          id: 'heatmap-layer', type: 'heatmap', source: 'heatmap-data', maxzoom: 15,
          paint: {
            'heatmap-weight': ['get', 'weight'],
            'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 15, 3],
            'heatmap-color': [
              'interpolate', ['linear'], ['heatmap-density'],
              0, 'rgba(0,0,0,0)', 0.2, '#4A6CF7', 0.4, '#FFC107', 0.6, '#FF6B00', 0.8, '#B02500', 1, '#7A0000',
            ],
            'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 12, 15, 35],
            'heatmap-opacity': 0.8,
          },
        } as any);

        // Invisible hit layer for click detection
        map.addLayer({
          id: 'heatmap-hit', type: 'circle', source: 'heatmap-data',
          paint: { 'circle-radius': 18, 'circle-opacity': 0, 'circle-color': '#000' },
        } as any);

        // Route lines source + layer (initially hidden)
        map.addSource('route-lines', { type: 'geojson', data: routeGeoJSON as any });
        map.addLayer({
          id: 'route-lines-layer', type: 'line', source: 'route-lines',
          layout: { 'line-join': 'round', 'line-cap': 'round', visibility: showRouteLines ? 'visible' : 'none' },
          paint: { 'line-width': 4, 'line-color': ['get', 'color'], 'line-opacity': 0.85 },
        } as any);
        map.addLayer({
          id: 'route-lines-glow', type: 'line', source: 'route-lines',
          layout: { 'line-join': 'round', 'line-cap': 'round', visibility: showRouteLines ? 'visible' : 'none' },
          paint: { 'line-width': 10, 'line-color': ['get', 'color'], 'line-opacity': 0.2 },
        } as any);
        map.addLayer({
          id: 'route-lines-label', type: 'symbol', source: 'route-lines',
          layout: {
            'text-field': ['get', 'label'],
            'text-size': 10,
            'text-offset': [0, -1.2],
            'text-anchor': 'bottom',
            visibility: showRouteLines ? 'visible' : 'none',
          },
          paint: { 'text-color': '#FFFFFF', 'text-halo-color': '#000000', 'text-halo-width': 1.5 },
        } as any);

        if (!cancelled) {
          mapRef.current = map;
          setMapReady(true);

          // Click handler
          map.on('click', 'heatmap-hit', (e: any) => {
            if (!e.features?.length) return;
            const coords = e.lngLat;
            const props = e.features[0].properties;
            map.flyTo({ center: [coords.lng, coords.lat], zoom: 14, duration: 1200 });

            if (popupRef.current) popupRef.current.remove();
            const label = props?.label || 'Punto de calor';
            const weight = props?.weight ? Math.round(props.weight * 100) : '—';
            popupRef.current = new maplibregl.Popup({ closeButton: true, closeOnClick: true, maxWidth: '220px' })
              .setLngLat([coords.lng, coords.lat])
              .setHTML(`
                <div style="font-family:sans-serif;padding:4px 2px">
                  <strong style="font-size:13px;color:#E1E2E6">${label}</strong><br/>
                  <span style="font-size:11px;color:#8B8D8F">Intensidad: ${weight}%</span>
                </div>
              `)
              .addTo(map);

            if (onPointClick) {
              onPointClick({ lng: coords.lng, lat: coords.lat, weight: props?.weight ?? 0.5, label });
            }
          });

          // Cursor change on hover
          map.on('mouseenter', 'heatmap-hit', () => { map.getCanvas().style.cursor = 'pointer'; });
          map.on('mouseleave', 'heatmap-hit', () => { map.getCanvas().style.cursor = ''; });
        }
      });

      map.on('error', () => {});
    })();

    return () => {
      cancelled = true;
      if (popupRef.current) { popupRef.current.remove(); popupRef.current = null; }
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, [themeName]);

  // Update heatmap data
  useEffect(() => {
    if (!mapRef.current || !mapRef.current.getSource('heatmap-data')) return;
    (mapRef.current.getSource('heatmap-data') as any).setData(heatmapGeoJSON as any);
  }, [heatmapGeoJSON]);

  // Toggle route lines visibility
  useEffect(() => {
    if (!mapRef.current || !mapRef.current.getLayer('route-lines-layer')) return;
    const vis = showRouteLines ? 'visible' : 'none';
    ['route-lines-layer', 'route-lines-glow', 'route-lines-label'].forEach((id) => {
      if (mapRef.current.getLayer(id)) mapRef.current.setLayoutProperty(id, 'visibility', vis);
    });
  }, [showRouteLines]);

  // Update route lines data
  useEffect(() => {
    if (!mapRef.current || !mapRef.current.getSource('route-lines')) return;
    (mapRef.current.getSource('route-lines') as any).setData(routeGeoJSON as any);
  }, [routeGeoJSON]);

  const hasNativeMapbox = Platform.OS !== 'web' && Platform.OS !== 'windows';

  return (
    <YStack backgroundColor={C.card} borderRadius={CARD_RADIUS} borderWidth={1} borderColor={C.border} padding="$4" gap="$3">
      <XStack gap="$2" alignItems="center">
        <MaterialIcons name="map" size={18} color={C.orange} />
        <Text fontSize={14} fontWeight="700" color={C.text}>Mapa de calor — Flujo peatonal</Text>
        <XStack flex={1} />
        {showRouteLines && (
          <XStack gap={4} alignItems="center" backgroundColor={`${C.orange}18`} paddingHorizontal="$2" paddingVertical={2} borderRadius={6}>
            <YStack width={6} height={6} borderRadius={3} backgroundColor={C.green} />
            <Text fontSize={9} fontWeight="700" color={C.orange}>RUTAS</Text>
          </XStack>
        )}
        {mapReady && (
          <XStack gap={4} alignItems="center">
            <YStack width={8} height={8} borderRadius={4} backgroundColor={C.green} />
            <Text fontSize={10} fontWeight="600" color={C.textDim}>{heatmapPoints.length} pts</Text>
          </XStack>
        )}
      </XStack>

      <YStack height={mh} borderRadius={12} overflow="hidden" backgroundColor="#1A1C1E" position="relative">
        {Platform.OS === 'web' ? (
          <>
            <div ref={mapContainer} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
            {!mapReady && (
              <YStack flex={1} height={mh} justifyContent="center" alignItems="center" gap="$2">
                <ActivityIndicator size="small" color={C.orange} />
                <Text fontSize={11} fontWeight="600" color={C.textDim}>Cargando mapa...</Text>
              </YStack>
            )}
            <XStack position="absolute" bottom={12} left={12} right={12} height={20} borderRadius={6} overflow="hidden">
              <LinearGradient
                colors={['rgba(0,0,0,0)', '#4A6CF7', '#FFC107', '#FF6B00', '#B02500', '#7A0000']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }}
              />
            </XStack>
            {mapReady && (
              <XStack position="absolute" top={8} left={8} height={24} paddingHorizontal="$2" borderRadius={6}
                backgroundColor="rgba(0,0,0,0.6)" justifyContent="center" alignItems="center" gap={3}
              >
                <MaterialIcons name="touch-app" size={12} color={C.textDim} />
                <Text fontSize={9} fontWeight="600" color={C.textDim}>Toca un punto del mapa</Text>
              </XStack>
            )}
          </>
        ) : (
          <YStack flex={1} height={mh} justifyContent="center" alignItems="center" gap="$3" padding="$4">
            <MaterialIcons name="map" size={40} color={C.textDim} opacity={0.4} />
            <Text fontSize={12} fontWeight="600" color={C.textDim} textAlign="center">
              {hasNativeMapbox ? 'Usa @rnmapbox/maps con ShapeSource + HeatmapLayer' : 'Mapa disponible en dispositivos móviles con Mapbox GL nativo'}
            </Text>
            <YStack backgroundColor={C.card} borderRadius={8} padding="$3" width="100%" gap="$1">
              <Text fontSize={10} fontWeight="700" color={C.orange}>@rnmapbox/maps — código de referencia:</Text>
              <Text fontSize={9} color={C.textDim} fontFamily="monospace">{'<Mapbox.ShapeSource id="heatmap" shape={heatmapGeoJSON}>'}</Text>
              <Text fontSize={9} color={C.textDim} fontFamily="monospace">{'  <Mapbox.HeatmapLayer id="heatmap-layer" style={heatmapPaint} />'}</Text>
              <Text fontSize={9} color={C.textDim} fontFamily="monospace">{'</Mapbox.ShapeSource>'}</Text>
            </YStack>
          </YStack>
        )}
      </YStack>
    </YStack>
  );
}

// ─── Main Dashboard Screen ───────────────────────────────────────────────────
export default function DashboardScreen() {
  const router = useRouter();

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [realtimeKPI, setRealtimeKPI] = useState<KPISummary | null>(null);
  const [mapFullscreen, setMapFullscreen] = useState(false);
  const [showRouteLines, setShowRouteLines] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchDashboardData();
      setData(result);
    } catch (err: any) {
      setError(err?.message ?? 'Error al cargar datos del dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  useEffect(() => {
    const unsub = subscribeToKPI((kpi) => setRealtimeKPI(kpi));
    return unsub;
  }, []);

  const kpi = realtimeKPI ?? data?.kpi;
  const heatmapPoints = data?.heatmapPoints ?? [];
  const zoneFlow = data?.zoneFlow ?? [];
  const transportMode = data?.transportMode ?? [];
  const routeLines = data?.routeLines ?? [];

  const saturationColor =
    kpi?.saturationLevel === 'Alto' ? C.red
    : kpi?.saturationLevel === 'Moderado' ? C.orange
    : C.green;

  const saturationIcon =
    kpi?.saturationLevel === 'Alto' ? 'warning'
    : kpi?.saturationLevel === 'Moderado' ? 'error-outline'
    : 'check-circle';

  // Filter heatmap by selected zone
  const filteredHeatmap = selectedZone
    ? heatmapPoints.filter((p) => p.zone === selectedZone)
    : heatmapPoints;

  const handlePointClick = useCallback((point: HeatmapPoint) => {
    if (point.zone) setSelectedZone(point.zone);
  }, []);

  const handleRoutesToggle = useCallback(() => {
    setShowRouteLines((prev) => !prev);
  }, []);

  const fullscreenMap = (
    <YStack flex={1} position="relative">
      <YStack flex={1}>
        <HeatmapMapCard
          heatmapPoints={filteredHeatmap}
          routeLines={routeLines}
          showRouteLines={showRouteLines}
          mapHeight={480}
          onPointClick={handlePointClick}
        />
      </YStack>
      <XStack position="absolute" top="$5" left="$5" width={44} height={44} borderRadius={12}
        backgroundColor={C.card} borderWidth={1} borderColor={C.border}
        justifyContent="center" alignItems="center" cursor="pointer"
        pressStyle={{ opacity: 0.75 }} onPress={() => setMapFullscreen(false)} zIndex={20}
      >
        <MaterialIcons name="arrow-back" size={22} color={C.text} />
      </XStack>
      <XStack position="absolute" top="$5" right="$5" width={44} height={44} borderRadius={12}
        backgroundColor={C.orange} justifyContent="center" alignItems="center"
        cursor="pointer" pressStyle={{ opacity: 0.8 }} onPress={() => setMapFullscreen(false)} zIndex={20}
      >
        <MaterialIcons name="dashboard" size={22} color="#FFFFFF" />
      </XStack>
      <XStack position="absolute" bottom="$5" alignSelf="center" paddingHorizontal="$5" height={38}
        borderRadius={14} backgroundColor={C.card} borderWidth={1} borderColor={C.border}
        justifyContent="center" alignItems="center" gap="$1.5" zIndex={20}
      >
        <YStack width={8} height={8} borderRadius={4} backgroundColor={C.green} />
        <Text fontSize={13} fontWeight="700" color={C.text}>
          {selectedZone ? `${selectedZone} · ` : ''}{filteredHeatmap.length} puntos
        </Text>
      </XStack>
    </YStack>
  );

  const dashboardView = (
    <>
      <XStack paddingHorizontal="$5" paddingVertical="$3" alignItems="center"
        justifyContent="space-between" borderBottomWidth={1} borderBottomColor={C.border}
      >
        <XStack width={40} height={40} borderRadius={10} justifyContent="center" alignItems="center"
          cursor="pointer" pressStyle={{ opacity: 0.6, backgroundColor: '#2A2A2D' }}
          onPress={() => { if (router.canGoBack()) router.back(); else router.replace('/(tabs)'); }}
        >
          <MaterialIcons name="arrow-back" size={22} color={C.text} />
        </XStack>
        <XStack gap="$2" alignItems="center">
          <MaterialIcons name="dashboard" size={20} color={C.orange} />
          <Text fontFamily="$heading" fontSize={17} fontWeight="800" color={C.textBright} letterSpacing={0.3}>
            Control Center
          </Text>
        </XStack>
        <XStack width={40} height={40} borderRadius={10} justifyContent="center" alignItems="center"
          backgroundColor={`${C.orange}18`} cursor="pointer" pressStyle={{ opacity: 0.7 }}
          onPress={() => setMapFullscreen(true)}
        >
          <MaterialIcons name="map" size={20} color={C.orange} />
        </XStack>
      </XStack>

      {loading && !data ? (
        <DashboardSkeleton />
      ) : error && !data ? (
        <DashboardError message={error} onRetry={loadData} />
      ) : !data ? (
        <DashboardEmpty />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          <YStack maxWidth={1200} alignSelf="center" width="100%" padding={BENTO_GAP} gap={BENTO_GAP}>
            {/* ROW 1: KPI Cards */}
            <XStack gap={BENTO_GAP} flexWrap="wrap">
              <MetricCard
                icon="people" iconColor={C.chartBlue}
                label="Flujo de personas"
                value={kpi ? kpi.totalFlow.toLocaleString('es-MX') : '—'}
                subtitle={selectedZone ? `Filtrando: ${selectedZone}` : 'En tiempo real'}
                trend="up"
                onPress={() => setSelectedZone(null)}
                active={!!selectedZone}
              />
              <MetricCard
                icon={saturationIcon} iconColor={saturationColor}
                label="Nivel de saturación"
                value={kpi?.saturationLevel ?? '—'}
                subtitle="Zona Centro"
                accentColor={saturationColor}
                trend={kpi?.saturationLevel === 'Alto' ? 'up' : 'neutral'}
              />
              <MetricCard
                icon="directions-bus" iconColor={C.yellow}
                label="Rutas activas"
                value={kpi ? String(kpi.activeRoutes) : '—'}
                subtitle={showRouteLines ? 'Mostrando en mapa' : 'Toca para ver rutas'}
                accentColor={C.yellow}
                onPress={handleRoutesToggle}
                active={showRouteLines}
              />
            </XStack>

            {/* ROW 2: Map + Charts */}
            <XStack gap={BENTO_GAP} flexDirection="column" $gtMd={{ flexDirection: 'row' }}>
              <YStack flex={1} $gtMd={{ flex: 1.5 }}>
                <HeatmapMapCard
                  heatmapPoints={filteredHeatmap}
                  routeLines={routeLines}
                  showRouteLines={showRouteLines}
                  onPointClick={handlePointClick}
                />
                {showRouteLines && (
                  <YStack marginTop="$2">
                    <RouteBreakdownPanel routes={routeLines} onClose={() => setShowRouteLines(false)} />
                  </YStack>
                )}
              </YStack>
              <YStack gap={BENTO_GAP} flex={1} $gtMd={{ flex: 1 }}>
                <BentoCard><VerticalBarChart data={zoneFlow} /></BentoCard>
                <BentoCard><DonutChart data={transportMode} /></BentoCard>
              </YStack>
            </XStack>

            {realtimeKPI && (
              <XStack gap="$2" alignItems="center" justifyContent="center" paddingTop="$2">
                <YStack width={8} height={8} borderRadius={4} backgroundColor={C.green}>
                  <YStack width={8} height={8} borderRadius={4} backgroundColor={C.green} opacity={0.5}
                    style={{ transform: [{ scale: 1.8 }] }} />
                </YStack>
                <Text fontSize={11} fontWeight="600" color={C.textDim}>Datos en tiempo real activos</Text>
              </XStack>
            )}
          </YStack>
        </ScrollView>
      )}
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <YStack flex={1} backgroundColor={C.bg}>
        {mapFullscreen ? fullscreenMap : dashboardView}
      </YStack>
    </SafeAreaView>
  );
}
