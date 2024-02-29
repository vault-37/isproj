"use client";

import { useState } from "react";
import MotorDataGraph from "./g2";
import "./dash.css";

function YourComponent({ motor_id }) {
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
  async function hc(){
    
  }
 
  return (
    <div className="graph-content">
      <div className="graph-btns">

      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={fetchRows}
      >
        Fetch Rows
      </button>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => console.log("Hello")}
      >
        Create report
      </button>
      </div>
      <div>{rows && <MotorDataGraph rows={rows} />}</div>
    </div>
  );
}

export default YourComponent;
