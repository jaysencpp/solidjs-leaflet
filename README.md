## solidjs-leaflet

A simple SolidJS wrapper for [leaflet](https://github.com/Leaflet/Leaflet) to display maps.

### Installation

```
npm install solidjs-leaflet leaflet
```

```
yarn add solidjs-leaflet leaflet
```

```
pnpm add solidjs-leaflet leaflet
```

If you are using Typescript, also install:

```
npm install -D @types/leaflet
```

```
yarn add -D @types/leaflet
```

```
pnpm add -D @types/leaflet
```


## Usage

To use the SolidJS leaflet wrapper:

```tsx
import {SolidLeafletMap} from "solidjs-leaflet"

const CardContentFigure = (props: CardContentFigureProps) => {
  return (
    <SolidLeafletMap
      center={[63.0, 13.0]}
      id="map"
      zoom={17}
      onMapReady={(l, m) => {
        const icon = l.icon({
          iconUrl: '/marker-icon.png',
          shadowUrl: '/marker-shadow.png',
        });
        const marker = l
          .marker([63.0 13.0], {
            icon,
          })
          .addTo(m);
        marker.bindPopup('Hello World!');
      }}
    />
  );
};
```