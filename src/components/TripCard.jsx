function TripCard({ tripId, event }) {

  if (!event) return null;

  return (

    <div style={{
      border: "1px solid gray",
      borderRadius: "10px",
      padding: "15px",
      marginBottom: "10px",
      backgroundColor: "#f9f9f9"
    }}>

      <h3>
        🚚 {tripId}
      </h3>

      <p>
        <strong>Speed:</strong>
        {event.speed ?? "N/A"}
      </p>

      <p>
        <strong>Fuel:</strong>
        {event.fuel ?? "N/A"}
      </p>

      <p>
        <strong>Status:</strong>
        {event.status ?? "Active"}
      </p>

      <p>
        <strong>Timestamp:</strong>
        {event.timestamp}
      </p>

    </div>

  );

}

export default TripCard;