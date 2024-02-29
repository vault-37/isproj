"use client"
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const MotorDataGraph = () => {
  const [motorData, setMotorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./api/lr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ motor_id: motor_id }),
        });
        const data = await response.json();
        setMotorData(data);
      } catch (error) {
        console.error("Error fetching motor data:", error);
      }
    };

    fetchData();
  }, []);

  // Extracting timestamps and current values from motorData
  const timestamps = motorData.map((item) => item.timestamp);
  const currentValues = motorData.map((item) => item.current_value);

  return (
    <div>
      <h2>Motor Data Graph</h2>
      <Plot
        data={[
          {
            x: timestamps,
            y: currentValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
        ]}
        layout={{
          width: 800,
          height: 400,
          title: "Current Value vs Timestamp",
        }}
      />
    </div>
  );
};

export default MotorDataGraph;
