export class TripSimulator {

  constructor(trips, speed = 2) {

    this.trips = trips;

    this.speedMultiplier = speed;

    this.currentIndexes = {};

    this.intervalId = null;

    trips.forEach(trip => {

      this.currentIndexes[trip.id] = 0;

    });

  }

  start(callback) {

    // Prevent multiple intervals
    if (this.intervalId) return;

    const delay = 500;

    this.intervalId = setInterval(() => {

      this.trips.forEach(trip => {

        const index =
          this.currentIndexes[trip.id];

        if (index < trip.events.length) {

          const event =
            trip.events[index];

          callback(trip.id, event);

          this.currentIndexes[trip.id]++;

        }

      });

    }, delay / this.speedMultiplier);

  }

  stop() {

    if (this.intervalId) {

      clearInterval(this.intervalId);

      this.intervalId = null;

    }

  }

}