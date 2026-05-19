declare module 'expo-router' {
  const expoRouter: any;
  export default expoRouter;
  export const Stack: any;
  export const Tabs: any;
  export const useRouter: any;
  export const useLocalSearchParams: any;
  export const Link: any;
  export const router: any;
}

declare module 'expo-router/html' {
  export const ScrollViewStyleReset: any;
}

declare module 'maplibre-gl' {
  const maplibregl: any;
  export default maplibregl;
  export = maplibregl;
}

declare module '@rnmapbox/maps' {
  const Mapbox: any;
  export default Mapbox;
  export const MapView: any;
  export const Camera: any;
  export const ShapeSource: any;
  export const HeatmapLayer: any;
  export const LineLayer: any;
  export const CircleLayer: any;
  export const SymbolLayer: any;
  export const PointAnnotation: any;
  export const Images: any;
}
