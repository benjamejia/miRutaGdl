import { supabase } from '../lib/supabase';
import type { FeatureCollection, Point } from 'geojson';
import type { KPISummary, HeatmapPoint, ZoneFlow, TransportMode, DashboardData, RouteLine } from '../types/dashboard';

const FALLBACK: DashboardData = {
  kpi: { totalFlow: 0, saturationLevel: '—', activeRoutes: 0 },
  heatmapPoints: [],
  zoneFlow: [],
  transportMode: [],
  routeLines: [],
};

function generateHeatmapData(): HeatmapPoint[] {
  const pts: HeatmapPoint[] = [];

  // Helper: add a cluster of points around a center with some spread
  function cluster(cx: number, cy: number, count: number, minW: number, maxW: number, label: string) {
    for (let i = 0; i < count; i++) {
      pts.push({
        lng: cx + (Math.random() - 0.5) * 0.025,
        lat: cy + (Math.random() - 0.5) * 0.02,
        weight: minW + Math.random() * (maxW - minW),
        label,
        zone: label,
      });
    }
  }

  // Centro Guadalajara — high density
  cluster(-103.350, 20.676, 24, 0.65, 1.0, 'Centro');
  cluster(-103.355, 20.673, 18, 0.60, 0.95, 'Centro');

  // Estadio Akron (World Cup venue)
  cluster(-103.460, 20.682, 20, 0.75, 1.0, 'Estadio Akron');
  cluster(-103.458, 20.685, 14, 0.70, 0.95, 'Estadio Akron');

  // Zapopan
  cluster(-103.395, 20.720, 16, 0.40, 0.75, 'Zapopan');
  cluster(-103.400, 20.715, 10, 0.35, 0.65, 'Zapopan');

  // Tlaquepaque
  cluster(-103.310, 20.640, 12, 0.35, 0.60, 'Tlaquepaque');
  cluster(-103.305, 20.645, 8, 0.30, 0.55, 'Tlaquepaque');

  // Tonalá
  cluster(-103.240, 20.625, 10, 0.20, 0.50, 'Tonalá');

  // Aeropuerto GDL
  cluster(-103.295, 20.525, 8, 0.30, 0.55, 'Aeropuerto');

  // Periférico / López Mateos corridor (traffic bottleneck)
  cluster(-103.410, 20.690, 12, 0.65, 0.95, 'Periférico');
  cluster(-103.415, 20.698, 10, 0.60, 0.90, 'Periférico');
  cluster(-103.420, 20.670, 8, 0.55, 0.85, 'López Mateos');

  // Av. Vallarta / Minerva
  cluster(-103.380, 20.685, 10, 0.50, 0.80, 'Minerva');
  cluster(-103.385, 20.690, 6, 0.45, 0.75, 'Minerva');

  // Estación del Tren Ligero (light rail stations)
  cluster(-103.360, 20.665, 8, 0.55, 0.80, 'Tren Ligero');
  cluster(-103.340, 20.655, 6, 0.50, 0.75, 'Tren Ligero');
  cluster(-103.370, 20.700, 6, 0.45, 0.70, 'Tren Ligero');

  return pts;
}

function generateRouteLines(): RouteLine[] {
  return [
    {
      id: 'linea-1',
      label: 'Línea 1 — Tren Ligero',
      color: '#B02500',
      coordinates: [
        [-103.410, 20.655],
        [-103.400, 20.660],
        [-103.390, 20.665],
        [-103.380, 20.670],
        [-103.370, 20.678],
        [-103.360, 20.685],
        [-103.350, 20.690],
        [-103.340, 20.695],
        [-103.330, 20.700],
      ],
    },
    {
      id: 'linea-2',
      label: 'Línea 2 — Tren Ligero',
      color: '#6200EE',
      coordinates: [
        [-103.370, 20.645],
        [-103.365, 20.650],
        [-103.360, 20.658],
        [-103.355, 20.665],
        [-103.350, 20.673],
        [-103.345, 20.680],
        [-103.340, 20.688],
      ],
    },
    {
      id: 'macrobus',
      label: 'Macrobús',
      color: '#026948',
      coordinates: [
        [-103.395, 20.715],
        [-103.390, 20.710],
        [-103.385, 20.702],
        [-103.380, 20.695],
        [-103.375, 20.688],
        [-103.370, 20.680],
        [-103.365, 20.672],
        [-103.360, 20.665],
        [-103.355, 20.658],
        [-103.350, 20.650],
        [-103.345, 20.642],
        [-103.340, 20.635],
      ],
    },
    {
      id: 'ruta-709',
      label: 'Ruta 709 — López Mateos',
      color: '#FF6B00',
      coordinates: [
        [-103.430, 20.710],
        [-103.425, 20.700],
        [-103.420, 20.690],
        [-103.418, 20.682],
        [-103.415, 20.675],
        [-103.412, 20.668],
        [-103.408, 20.660],
        [-103.405, 20.652],
      ],
    },
    {
      id: 'ruta-380',
      label: 'Ruta 380 — Av. Vallarta',
      color: '#CCB9FF',
      coordinates: [
        [-103.415, 20.690],
        [-103.405, 20.688],
        [-103.395, 20.686],
        [-103.385, 20.684],
        [-103.375, 20.682],
        [-103.365, 20.680],
        [-103.355, 20.678],
      ],
    },
    {
      id: 'ruta-173',
      label: 'Ruta 173 — Periférico',
      color: '#F5C518',
      coordinates: [
        [-103.430, 20.720],
        [-103.428, 20.710],
        [-103.425, 20.700],
        [-103.422, 20.690],
        [-103.420, 20.680],
        [-103.418, 20.670],
        [-103.415, 20.660],
        [-103.412, 20.650],
        [-103.408, 20.640],
      ],
    },
  ];
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const results = await Promise.allSettled([
    supabase.from('dashboard_kpi').select('*').single(),
    supabase.from('heatmap_points').select('lng,lat,weight,label,zone'),
    supabase.from('zone_flow').select('label,value').order('value', { ascending: false }),
    supabase.from('transport_mode').select('name,percentage,color').order('percentage', { ascending: false }),
  ]);

  const [kpiRes, heatRes, zoneRes, modeRes] = results.map(
    (r) => (r.status === 'fulfilled' ? r.value : { data: null, error: null }),
  );

  return {
    kpi: kpiRes?.data
      ? {
          totalFlow: kpiRes.data.total_flow,
          saturationLevel: kpiRes.data.saturation,
          activeRoutes: kpiRes.data.active_routes,
        }
      : { ...FALLBACK.kpi, activeRoutes: 18 },
    heatmapPoints: (heatRes?.data as HeatmapPoint[])?.length ? (heatRes.data as HeatmapPoint[]) : generateHeatmapData(),
    zoneFlow: (zoneRes?.data as ZoneFlow[])?.length ? (zoneRes.data as ZoneFlow[]) : FALLBACK.zoneFlow,
    transportMode: (modeRes?.data as TransportMode[])?.length ? (modeRes.data as TransportMode[]) : FALLBACK.transportMode,
    routeLines: generateRouteLines(),
  };
}

export function subscribeToKPI(onUpdate: (kpi: KPISummary) => void): () => void {
  const channel = supabase
    .channel('kpi-realtime')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'dashboard_kpi' },
      (payload) => {
        const row = payload.new as any;
        onUpdate({
          totalFlow: row.total_flow,
          saturationLevel: row.saturation,
          activeRoutes: row.active_routes,
        });
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export function toHeatmapGeoJSON(points: HeatmapPoint[]): FeatureCollection<Point> {
  return {
    type: 'FeatureCollection',
    features: points.map((p) => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [p.lng, p.lat] },
      properties: { weight: p.weight, label: p.label ?? '', zone: p.zone ?? '' },
    })),
  };
}

export function toRouteGeoJSON(routes: RouteLine[]): FeatureCollection<any> {
  return {
    type: 'FeatureCollection',
    features: routes.map((r) => ({
      type: 'Feature',
      geometry: { type: 'LineString', coordinates: r.coordinates },
      properties: { id: r.id, label: r.label, color: r.color },
    })),
  };
}

export type { DashboardData, RouteLine };
