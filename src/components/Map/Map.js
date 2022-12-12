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

const { MapContainer, Marker, Popup, GeoJSON } = ReactLeaflet;

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
          Route côtière
        </Popup>
      </Marker>
      <GeoJSON data={{
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "coordinates": [
                            [
                                -8.295658308045859,
                                33.352025925727744
                            ],
                            [
                                -8.294867949785385,
                                33.35258342022529
                            ],
                            [
                                -8.2950962755055,
                                33.35275947037755
                            ],
                            [
                                -8.295517799911465,
                                33.354563963908234
                            ],
                            [
                                -8.296395975756269,
                                33.355986993399256
                            ],
                            [
                                -8.29662430147502,
                                33.3569112165863
                            ],
                            [
                                -8.2969053177452,
                                33.35742466967136
                            ],
                            [
                                -8.29620277707042,
                                33.357938119727905
                            ],
                            [
                                -8.294780132201055,
                                33.35880364296595
                            ],
                            [
                                -8.295904197283107,
                                33.35994788081429
                            ],
                            [
                                -8.295921760798905,
                                33.360153255245905
                            ],
                            [
                                -8.296413539272038,
                                33.360740036665135
                            ],
                            [
                                -8.29611495948609,
                                33.3609454092273
                            ]
                        ],
                        "type": "LineString"
                    }
                }
            ]
        }} />
    </MapContainer>
  )
}

export default Map;
