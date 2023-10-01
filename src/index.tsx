import type { TileLayerOptions, Map as LMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mergeProps, onMount } from 'solid-js';
import type * as L from 'leaflet';

export type SolidLeafletMapProps = {
  /** The ID given to the div element and used by leaflet */
  id: string;
  /** latitude and longitude coordinates of the map */
  center: [number, number];
  /** Default zoom of the map */
  zoom?: number;
  /** The width of the map in pixels or percentage*/
  width?: `${number}px` | `${number}%`;
  /** The height of the map in pixels */
  height?: `${number}px` | `${number}%`;
  /** Tile layer options */
  tileLayer?: {
    /** Where to get the tiles from. Defaults to openstreetmap */
    urlTemplate?: string;
    options?: TileLayerOptions;
  };

  mapOptions?: Omit<L.MapOptions, 'zoom' | 'center'>;
  /** Callback function that is ran after map is configured. */
  onMapReady?: (leaflet: typeof L, map: LMap) => void;
};
export function SolidLeafletMap(props: SolidLeafletMapProps) {
  const mergedProps = mergeProps(
    {
      width: '1000px',
      height: '1000px',
      zoom: 5,
      tileLayer: {
        urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        options: undefined,
      },
    },
    props
  );

  let map;

  onMount(async () => {
    const imp = await import('leaflet');
    const L = imp.default;
    map = L.map(mergedProps.id, mergedProps.mapOptions).setView(
      mergedProps.center,
      mergedProps.zoom
    );
    L.tileLayer(
      mergedProps.tileLayer.urlTemplate!,
      mergedProps.tileLayer.options
    ).addTo(map);
    mergedProps.onMapReady && mergedProps.onMapReady(L, map);
  });

  return (
    <div
      style={{ height: mergedProps.height, width: mergedProps.width }}
      id={mergedProps.id}
    ></div>
  );
}
