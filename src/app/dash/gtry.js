"use client"

import { useState } from "react";

function YourComponent({motor_id}) {
  const [rows, setRows] = useState(null);

  async function fetchRows() {
    try {
      const response = await fetch("./api/lr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ motor_id: motor_id }),
      });
      if (response.ok) {
        const data = await response.json();
        setRows(data.rows);
      } else {
        console.error("Failed to fetch last row:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching last row:", error);
    }
  }

  return (
    <div>
      <button onClick={fetchRows}>Fetch Rows</button>
      <div>
        {rows &&
          rows.map((r) => (
            <div>
              <p>ID: {r.motor_id}</p>
              <p>timestamp: {r.timestamp}</p>
              <p>current_value: {r.current_value}</p>
              <p>frequency: {r.frequency}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default YourComponent;
