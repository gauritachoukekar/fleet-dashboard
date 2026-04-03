
import trip1 from "../data/trip_2_urban_dense.json";
import trip2 from "../data/trip_4_southern_technical.json";


export function loadAllTrips() {

  return [

    {
      id: "Trip_1",
      events: trip1
    },

    {
      id: "Trip_2",
      events: trip2
    },

  ];

}