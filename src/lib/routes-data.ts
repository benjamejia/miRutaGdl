import type { FeatureCollection, LineString, Point } from 'geojson';

export const GUADALAJARA_CENTER: [number, number] = [-103.3925, 20.6767];
export const ESTADIO_AKRON: [number, number] = [-103.4622, 20.6819];

export interface ZoneInfo {
  id: string;
  name: string;
  label: string;
  coordinates: [number, number];
  routeLine: string;
  color: string;
}

export const ZMG_ZONES: ZoneInfo[] = [
  { id: 'zona-centro', name: 'Centro Histórico', label: 'C01 Centro', coordinates: [-103.3475, 20.6767], routeLine: 'C01 Centro', color: '#E63946' },
  { id: 'zona-zapopan', name: 'Zapopan Centro', label: 'Z01 Zapopan', coordinates: [-103.4000, 20.7200], routeLine: 'Z01 Zapopan', color: '#FF6B00' },
  { id: 'zona-tlaquepaque', name: 'Tlaquepaque', label: 'T01 Tlaquepaque', coordinates: [-103.3108, 20.6400], routeLine: 'T01 Tlaquepaque', color: '#6200EE' },
  { id: 'zona-tonala', name: 'Tonalá', label: 'TL01 Tonalá', coordinates: [-103.2400, 20.6200], routeLine: 'TL01 Tonalá', color: '#026948' },
  { id: 'zona-andares', name: 'Andares / Minerva', label: 'A01 Andares', coordinates: [-103.4200, 20.7000], routeLine: 'A01 Andares', color: '#1D3557' },
  { id: 'zona-universidad', name: 'Universidad GDL', label: 'U01 Universidad', coordinates: [-103.3500, 20.6550], routeLine: 'U01 Universidad', color: '#FFB703' },
  { id: 'zona-agua-azul', name: 'Parque Agua Azul', label: 'P01 Agua Azul', coordinates: [-103.3700, 20.6550], routeLine: 'P01 Agua Azul', color: '#457B9D' },
  { id: 'zona-aeropuerto', name: 'Aeropuerto GDL', label: 'AP01 Aeropuerto', coordinates: [-103.3000, 20.5200], routeLine: 'AP01 Aeropuerto', color: '#E07A5F' },
  { id: 'zona-plaza-del-sol', name: 'Plaza del Sol', label: 'S01 Plaza del Sol', coordinates: [-103.3800, 20.6550], routeLine: 'S01 Plaza del Sol', color: '#2A9D8F' },
  { id: 'zona-jalisco', name: 'Estadio Jalisco', label: 'J01 Jalisco', coordinates: [-103.3300, 20.7050], routeLine: 'J01 Jalisco', color: '#D62828' },
  { id: 'zona-periferico', name: 'Periférico Norte', label: 'N01 Periférico', coordinates: [-103.4200, 20.7500], routeLine: 'N01 Periférico', color: '#6A4C93' },
];

function routeToAkron(from: [number, number], midpoints: [number, number][]): [number, number][] {
  return [from, ...midpoints, ESTADIO_AKRON];
}

function buildLine(coordinates: [number, number][], color: string): FeatureCollection<LineString> {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { color },
        geometry: { type: 'LineString', coordinates },
      },
    ],
  };
}

function buildPoint(coordinates: [number, number], label: string, extraProps?: Record<string, string>): FeatureCollection<Point> {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { label, ...extraProps },
        geometry: { type: 'Point', coordinates },
      },
    ],
  };
}

export const routeLineColors: Record<string, string> = {};
ZMG_ZONES.forEach(z => { routeLineColors[z.routeLine] = z.color; });

export interface RouteGeoData {
  id: string;
  line: string;
  label: string;
  geojson: FeatureCollection<LineString>;
}

const centroCoords = routeToAkron(ZMG_ZONES[0].coordinates, [[-103.3550, 20.6775], [-103.3700, 20.6790], [-103.3850, 20.6805], [-103.4000, 20.6810], [-103.4150, 20.6815], [-103.4300, 20.6818], [-103.4450, 20.6819]]);
const zapopanCoords = routeToAkron(ZMG_ZONES[1].coordinates, [[-103.4100, 20.7100], [-103.4150, 20.7000], [-103.4200, 20.6950], [-103.4300, 20.6880], [-103.4450, 20.6830], [-103.4550, 20.6820]]);
const tlaquepaqueCoords = routeToAkron(ZMG_ZONES[2].coordinates, [[-103.3250, 20.6450], [-103.3400, 20.6520], [-103.3550, 20.6580], [-103.3700, 20.6640], [-103.3850, 20.6700], [-103.4000, 20.6750], [-103.4200, 20.6790], [-103.4400, 20.6810], [-103.4550, 20.6819]]);
const tonalaCoords = routeToAkron(ZMG_ZONES[3].coordinates, [[-103.2550, 20.6250], [-103.2700, 20.6350], [-103.2900, 20.6480], [-103.3100, 20.6580], [-103.3350, 20.6680], [-103.3600, 20.6750], [-103.3850, 20.6800], [-103.4100, 20.6815], [-103.4400, 20.6819]]);
const andaresCoords = routeToAkron(ZMG_ZONES[4].coordinates, [[-103.4250, 20.6950], [-103.4350, 20.6900], [-103.4450, 20.6860], [-103.4550, 20.6830]]);
const universidadCoords = routeToAkron(ZMG_ZONES[5].coordinates, [[-103.3550, 20.6600], [-103.3650, 20.6650], [-103.3750, 20.6700], [-103.3900, 20.6750], [-103.4050, 20.6780], [-103.4200, 20.6795], [-103.4400, 20.6810], [-103.4550, 20.6819]]);
const aguaAzulCoords = routeToAkron(ZMG_ZONES[6].coordinates, [[-103.3750, 20.6600], [-103.3850, 20.6650], [-103.3950, 20.6720], [-103.4100, 20.6770], [-103.4250, 20.6795], [-103.4450, 20.6815]]);
const aeropuertoCoords = routeToAkron(ZMG_ZONES[7].coordinates, [[-103.3100, 20.5350], [-103.3250, 20.5550], [-103.3400, 20.5750], [-103.3550, 20.5950], [-103.3700, 20.6150], [-103.3850, 20.6350], [-103.4000, 20.6550], [-103.4150, 20.6720], [-103.4400, 20.6800]]);
const plazaDelSolCoords = routeToAkron(ZMG_ZONES[8].coordinates, [[-103.3850, 20.6600], [-103.3950, 20.6650], [-103.4050, 20.6700], [-103.4150, 20.6750], [-103.4300, 20.6790], [-103.4450, 20.6810]]);
const jaliscoCoords = routeToAkron(ZMG_ZONES[9].coordinates, [[-103.3400, 20.7000], [-103.3550, 20.6950], [-103.3700, 20.6900], [-103.3850, 20.6850], [-103.4000, 20.6830], [-103.4200, 20.6820], [-103.4400, 20.6819]]);
const perifericoCoords = routeToAkron(ZMG_ZONES[10].coordinates, [[-103.4220, 20.7400], [-103.4250, 20.7300], [-103.4300, 20.7200], [-103.4350, 20.7100], [-103.4400, 20.7000], [-103.4450, 20.6920], [-103.4520, 20.6860], [-103.4580, 20.6830]]);

export const routeData: Record<string, RouteGeoData> = {
  'C01 Centro': { id: 'route-C01-Centro', line: 'C01 Centro', label: 'C01 Centro — 35 min', geojson: buildLine(centroCoords, routeLineColors['C01 Centro']) },
  'Z01 Zapopan': { id: 'route-Z01-Zapopan', line: 'Z01 Zapopan', label: 'Z01 Zapopan — 25 min', geojson: buildLine(zapopanCoords, routeLineColors['Z01 Zapopan']) },
  'T01 Tlaquepaque': { id: 'route-T01-Tlaquepaque', line: 'T01 Tlaquepaque', label: 'T01 Tlaquepaque — 40 min', geojson: buildLine(tlaquepaqueCoords, routeLineColors['T01 Tlaquepaque']) },
  'TL01 Tonalá': { id: 'route-TL01-Tonala', line: 'TL01 Tonalá', label: 'TL01 Tonalá — 50 min', geojson: buildLine(tonalaCoords, routeLineColors['TL01 Tonalá']) },
  'A01 Andares': { id: 'route-A01-Andares', line: 'A01 Andares', label: 'A01 Andares — 20 min', geojson: buildLine(andaresCoords, routeLineColors['A01 Andares']) },
  'U01 Universidad': { id: 'route-U01-Universidad', line: 'U01 Universidad', label: 'U01 Universidad — 30 min', geojson: buildLine(universidadCoords, routeLineColors['U01 Universidad']) },
  'P01 Agua Azul': { id: 'route-P01-AguaAzul', line: 'P01 Agua Azul', label: 'P01 Agua Azul — 35 min', geojson: buildLine(aguaAzulCoords, routeLineColors['P01 Agua Azul']) },
  'AP01 Aeropuerto': { id: 'route-AP01-Aeropuerto', line: 'AP01 Aeropuerto', label: 'AP01 Aeropuerto — 55 min', geojson: buildLine(aeropuertoCoords, routeLineColors['AP01 Aeropuerto']) },
  'S01 Plaza del Sol': { id: 'route-S01-PlazaDelSol', line: 'S01 Plaza del Sol', label: 'S01 Plaza del Sol — 30 min', geojson: buildLine(plazaDelSolCoords, routeLineColors['S01 Plaza del Sol']) },
  'J01 Jalisco': { id: 'route-J01-Jalisco', line: 'J01 Jalisco', label: 'J01 Jalisco — 32 min', geojson: buildLine(jaliscoCoords, routeLineColors['J01 Jalisco']) },
  'N01 Periférico': { id: 'route-N01-Periferico', line: 'N01 Periférico', label: 'N01 Periférico — 28 min', geojson: buildLine(perifericoCoords, routeLineColors['N01 Periférico']) },
};

export const markers = {
  origin: buildPoint([-103.38, 20.67], 'Tu ubicación'),
  destination: buildPoint(ESTADIO_AKRON, 'Estadio Akron'),
};

export const zoneMarkers: FeatureCollection<Point> = {
  type: 'FeatureCollection',
  features: ZMG_ZONES.map(z => ({
    type: 'Feature',
    properties: { label: z.name, zoneId: z.id, routeLine: z.routeLine, color: z.color },
    geometry: { type: 'Point', coordinates: z.coordinates },
  })),
};

export function getActiveRoute(lineName: string): RouteGeoData {
  return routeData[lineName] ?? routeData['Z01 Zapopan'];
}
