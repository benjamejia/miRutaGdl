export interface KPISummary {
  totalFlow: number;
  saturationLevel: string;
  activeRoutes: number;
}

export interface HeatmapPoint {
  lng: number;
  lat: number;
  weight: number;
  label?: string;
  zone?: string;
}

export interface ZoneFlow {
  label: string;
  value: number;
}

export interface TransportMode {
  name: string;
  percentage: number;
  color: string;
}

export interface RouteLine {
  id: string;
  label: string;
  color: string;
  coordinates: [number, number][];
}

export interface DashboardData {
  kpi: KPISummary;
  heatmapPoints: HeatmapPoint[];
  zoneFlow: ZoneFlow[];
  transportMode: TransportMode[];
  routeLines: RouteLine[];
}
