import { supabase } from '../lib/supabase';
import type { AlternativeRouteData } from '../components';

export interface RouteAlternativeRow {
  id: string;
  line_name: string;
  total_time_minutes: number;
  departure_offset_minutes: number;
  route_type: 'bus' | 'train';
  is_fastest: boolean;
  status: 'on_time' | 'delayed';
  delay_minutes: number | null;
  walk_time_minutes: number;
}

function buildSegments(row: RouteAlternativeRow): AlternativeRouteData['segments'] {
  if (row.line_name.includes('+')) {
    const lines = row.line_name.split('+').map(l => l.trim());
    const firstDuration = Math.round(row.total_time_minutes * 0.6);
    const secondDuration = Math.round(row.total_time_minutes * 0.4);
    return [
      { type: row.route_type, line: lines[0], duration: `${firstDuration} min` },
      { type: 'walk' as const, duration: `${row.walk_time_minutes} min` },
      { type: row.route_type === 'bus' ? 'train' as const : 'bus' as const, line: lines[1], duration: `${secondDuration} min` },
    ];
  }

  return [
    { type: row.route_type, line: row.line_name, duration: `${row.total_time_minutes} min` },
  ];
}

function buildBadges(row: RouteAlternativeRow): AlternativeRouteData['badges'] {
  const badges: AlternativeRouteData['badges'] = [];
  if (row.is_fastest) {
    badges.push({ label: 'Más rápido', variant: 'success' });
  }
  if (row.status === 'delayed' && row.delay_minutes) {
    badges.push({ label: `+${row.delay_minutes} min / tráfico`, variant: 'error' });
  } else {
    badges.push({ label: 'Directo', variant: 'primary' });
  }
  return badges;
}

function buildDepartureLabel(row: RouteAlternativeRow): string {
  return row.departure_offset_minutes <= 1
    ? 'Sale ahora'
    : `Sale en ${row.departure_offset_minutes} min`;
}

function toAlternativeRouteData(row: RouteAlternativeRow): AlternativeRouteData {
  return {
    id: row.id,
    duration: row.total_time_minutes,
    departureLabel: buildDepartureLabel(row),
    badges: buildBadges(row),
    walkTime: row.walk_time_minutes,
    segments: buildSegments(row),
  };
}

export interface RouteDetail {
  id: string;
  lineName: string;
  duration: number;
  status: 'on_time' | 'delayed';
}

export async function fetchRouteAlternatives(): Promise<{
  alternatives: AlternativeRouteData[];
  details: RouteDetail[];
  fastest: RouteAlternativeRow | null;
}> {
  const { data, error } = await supabase
    .from('route_alternatives')
    .select('*')
    .order('total_time_minutes', { ascending: true });

  if (error) throw new Error(`Error al cargar rutas: ${error.message}`);

  const rows = data as RouteAlternativeRow[];
  const alternatives = rows.map(toAlternativeRouteData);
  const details = rows.map(r => ({
    id: r.id,
    lineName: r.line_name,
    duration: r.total_time_minutes,
    status: r.status,
  }));
  const fastest = rows.find(r => r.is_fastest) ?? rows[0] ?? null;

  return { alternatives, details, fastest };
}
