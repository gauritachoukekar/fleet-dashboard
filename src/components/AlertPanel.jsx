function AlertPanel({ vehicles }) {

  const alerts = [];

  Object.keys(vehicles).forEach(id => {

    const v = vehicles[id];

    // Low fuel
    if (v.fuel && v.fuel < 20) {

      alerts.push(
        `⚠️ ${id} — Low Fuel`
      );

    }

    // Overspeed
    if (v.speed && v.speed > 100) {

      alerts.push(
        `🚨 ${id} — Overspeed`
      );

    }

    // Cancelled trip
    if (v.status === "trip_cancelled") {

      alerts.push(
        `❌ ${id} — Trip Cancelled`
      );

    }

  });

  return (

    <div style={{
      border: "2px solid red",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "20px",
      backgroundColor: "#fff3f3"
    }}>

      <h2>
        🚨 Alerts Panel
      </h2>

      {alerts.length === 0 ? (

        <p>
          ✅ No alerts
        </p>

      ) : (

        alerts.map((a, i) => (

          <p key={i}>
            {a}
          </p>

        ))

      )}

    </div>

  );

}

export default AlertPanel;