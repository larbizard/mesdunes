import { useEffect } from 'react';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import LocationMarker from './LocationMarker';


let CustomIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3277/3277631.png',
    iconSize:     [48, 58], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 44], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -15] // point from which the popup should open relative to the iconAnchor
  });

  let TurnLeftIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/6818/6818409.png',
    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 44], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });


const DEFAULT_CENTER = [33.36081, -8.29610]

const ROAD_MARKER = [33.352025922821454, -8.295728560922754]

const { MapContainer, Marker, Popup } = ReactLeaflet;

const Map = ({ children, className, ...rest }) => {
  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);

  return (
    <MapContainer className={mapClassName} {...rest}>
      {children(ReactLeaflet)}
      <LocationMarker />

      <Marker icon={CustomIcon} position={DEFAULT_CENTER}>
        <Popup>
          Mes dunes.
        </Popup>
      </Marker>
      <Marker icon={TurnLeftIcon} position={ROAD_MARKER}>
        <Popup>
          Mes dunes.
        </Popup>
      </Marker>
      
    </MapContainer>
  )
}

export default Map;
