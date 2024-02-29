"use client"
import { useState, useEffect } from "react";
import "./dash.css";

function MotorDropdown({foo}) {
  const [motorList, setMotorList] = useState([]);

  useEffect(() => {
    async function fetchMotorList() {
      try {
        const response = await fetch("./api/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch motor list");
        }
        const data = await response.json();
        setMotorList(data.m_list);
      } catch (error) {
        console.error("Error fetching motor list:", error);
        // Handle error
      }
    }

    fetchMotorList();
  }, []);

  return (
    <div className="graph-dropdown">
      {/* <label htmlFor="motorSelect">Select a motor:</label> */}
      <select
        id="motorSelect"
        className="block bg-black text-white p-2 rounded-md"
        onChange={(e)=>foo(e.target.value)}
      >
        <option value="">Select a motor...</option>
        {motorList.map((motor) => (
          <option key={motor.motor_id} value={motor.motor_id}>
            {motor.motor_id}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MotorDropdown;
