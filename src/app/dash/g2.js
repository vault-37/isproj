// import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./dash.css"

const MotorDataGraph = ({ rows }) => {
  // Extracting timestamps and current values from motorData
  const data = rows.map((item) => ({
    timestamp: item.timestamp,
    currentValue: item.current_value,
    frequency: item.frequency,
  }));

  return (
    <div className="g2-cont" style={{ display: "flex" }}>
      <div style={{ flex: 1, margin: "0 10px" }}>
        <h2>Current Value vs Timestamp</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              label={{ value: "Timestamp", position: "insideBottom", dy: 10 }}
            />
            <YAxis
              label={{
                value: "Current Value",
                angle: -90,
                position: "insideLeft",
                dx: -10,
              }}
            />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="currentValue" stroke="#ff7f0e" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ flex: 1, margin: "0 10px" }}>
        <h2>Frequency vs Timestamp</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              label={{ value: "Timestamp", position: "insideBottom", dy: 10 }}
            />
            <YAxis
              label={{
                value: "Frequency",
                angle: -90,
                position: "insideLeft",
                dx: -10,
              }}
            />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="frequency" stroke="#1f77b4" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MotorDataGraph;
