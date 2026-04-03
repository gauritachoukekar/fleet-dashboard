import trip3 from "../data/trip_3_mountain_cancelled.json";
import trip4 from "../data/trip_4_southern_technical.json";
import trip5 from "../data/trip_5_regional_logistics.json";
import trip1 from "../data/trip_1_cross_country.json";
import trip2 from "../data/trip_2_urban_dense.json";


export function loadAllTrips() {

  return [
    { id: "trip_1", events: trip1 },
    { id: "trip_2", events: trip2 },
    { id: "trip_3", events: trip3 },
    { id: "trip_4", events: trip4 },
    { id: "trip_5", events: trip5 }

  ];

trips.forEach(trip => {

    trip.events.sort(
      (a, b) =>
        new Date(a.timestamp) -
        new Date(b.timestamp)
    );

  });

  return trips;
}