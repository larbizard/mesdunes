import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "./constants";

const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        // map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
        L.geoJSON({
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
        }).addTo(map);
      });
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>
          Vous êtes ici
        </Popup>
      </Marker>
    );
  }

  export default LocationMarker;