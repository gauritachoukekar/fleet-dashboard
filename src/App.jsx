import { useEffect, useState } from "react";
import { loadAllTrips } from "./utils/loadTrips";
import { TripSimulator } from "./utils/simulator";

import MapView from "./components/MapView";
import TripCard from "./components/TripCard";
import AlertPanel from "./components/AlertPanel";

function App() {

  const [vehicles, setVehicles] = useState({});

  useEffect(() => {

    // Load trips
    const trips = loadAllTrips();

    // Slower and stable simulation speed
    const simulator =
      new TripSimulator(trips, 2);

    simulator.start((tripId, event) => {

      if (!event.location) return;

      const lat = event.location?.lat;
      const lng = event.location?.lng;

      if (!lat || !lng) return;

      setVehicles(prev => {

        const prevVehicle =
          prev[tripId] || {};

        // Simulated speed
        const newSpeed =
          Math.floor(
            Math.random() * 40 + 60
          ); // 60–100

        // Simulated fuel drop
        const newFuel =
          prevVehicle.fuel
            ? Math.max(
                prevVehicle.fuel - 0.5,
                10
              )
            : 90;

        return {

          ...prev,

          [tripId]: {

            lat,
            lng,

            speed: newSpeed,

            fuel: newFuel,

            overspeed:
              newSpeed > 100,

            status:
              event.event_type,

            timestamp:
              event.timestamp,

            // 🚀 LIMIT ROUTE SIZE (VERY IMPORTANT)
            route: [

              ...(prevVehicle.route || []),

              [lat, lng]

            ].slice(-50) // keep only last 50 points

          }

        };

      });

    });

    return () =>
      simulator.stop();

  }, []);

  return (

    <div style={{ padding: 20 }}>

      <h1>
        🚚 Fleet Tracking Dashboard
      </h1>

      {/* 🚨 Alerts */}

      <AlertPanel
        vehicles={vehicles}
      />

      {/* 🚚 Trip Cards */}

      {Object.keys(vehicles)
        .slice(0, 5) // limit rendering
        .map(tripId => (

        <TripCard
          key={tripId}
          tripId={tripId}
          event={
            vehicles[tripId]
          }
        />

      ))}

      {/* 🗺️ Map */}

      <MapView
        vehicles={vehicles}
      />

    </div>

  );

}

export default App;