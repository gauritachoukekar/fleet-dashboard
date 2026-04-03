import React, { useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";


// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"

});


// 🔴 Red marker for overspeed
const redIcon = new L.Icon({

  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41]

});


// 🚚 Auto move map safely
function AutoCenter({ vehicles }) {

  const map = useMap();

  useEffect(() => {

    const ids = Object.keys(vehicles);

    if (ids.length > 0) {

      const v = vehicles[ids[0]];

      if (v?.lat && v?.lng) {

        map.setView(
          [v.lat, v.lng],
          6
        );

      }

    }

  }, [vehicles, map]); // run only when vehicles update

  return null;

}


function MapView({ vehicles }) {

  return (

    <MapContainer
      center={[20, 78]}
      zoom={5}
      style={{
        height: "500px",
        width: "100%",
        marginTop: "20px"
      }}
    >

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 🚚 Auto follow */}

      <AutoCenter
        vehicles={vehicles}
      />

      {Object.keys(vehicles)
        .slice(0, 5) // limit vehicles
        .map(id => {

        const v = vehicles[id];

        if (!v.lat || !v.lng)
          return null;

        const position = [
          v.lat,
          v.lng
        ];

        return (

          <React.Fragment key={id}>

            {/* 📍 Marker */}

            <Marker
              position={position}
              icon={
                v.overspeed
                  ? redIcon
                  : undefined
              }
            >

              <Popup>

                🚚 <strong>{id}</strong>

                <br />

                ⏱️ {v.timestamp}

                <br />

                🚀 Speed:
                {v.speed} km/h

                <br />

                🔋 Fuel:
                {v.fuel} %

                <br />

                🚨 Overspeed:
                {v.overspeed
                  ? "YES"
                  : "NO"}

              </Popup>

            </Marker>

            {/* 🧭 Route Trail */}

            {v.route &&
             v.route.length > 1 && (

              <Polyline
                positions={v.route}
              />

            )}

          </React.Fragment>

        );

      })}

    </MapContainer>

  );

}

export default MapView;