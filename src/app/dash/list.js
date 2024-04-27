"use client";
import { useState, useEffect } from "react";
import "./dash.css";
import { ProgressBar } from "react-loader-spinner";

function MotorDropdown({ foo }) {
  const [motorList, setMotorList] = useState([]);

  function randomChoice() {
    const choices = ["faulty", "working"]; // Array of choices
    const randomIndex = Math.floor(Math.random() * choices.length); // Generate a random index
    return choices[randomIndex]; // Return the choice at the random index
  }

  useEffect(() => {
    async function fetchMotorList() {
       try {
         const token = localStorage.getItem("authToken");
         const response = await fetch(
           "http://localhost:8000/api/motor/all-motor-ids",
           {
             cache: "no-store",
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               token: token,
             },
           }
         );

         if (!response.ok) {
           throw new Error("Failed to fetch submissions");
         }

         const data = await response.json();
         setMotorList(data.rows);
       } catch (error) {
         console.error("Error fetching submissions:", error);
         // Handle errors, e.g., display error message to the user
       }
    }

    fetchMotorList();
    document;
  }, []);

  return (
    <div className="graph-dropdown flex-col justify-between space-y-4 w-4/5">
      {/* <label htmlFor="motorSelect">Select a motor:</label> */}
      {/* <select
        id="motorSelect"
        className="block bg-[#ffedd5] text-gray-700 p-2 rounded-md"
        onChange={(e) => foo(e.target.value)}
      >
        <option value="">Select a motor...</option>
        {motorList.map((motor) => (
          <option key={motor.motor_id} value={motor.motor_id}>
            {motor.motor_id}
          </option>
        ))}
      </select> */}
      <div className="w-full text-xl font-medium text-gray-900 bg-[#ffedd5] border border-gray-200 rounded-lg">
        {motorList.length == 0 && (
          <ProgressBar
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="w-full flex justify-around"
          />
        )}
        {motorList.map((motor) => (
          <button
            type="button"
            className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            value={motor.motor_id}
          >
            <div className="flex justify-between justify-items-center">
              <div className="px-4 py-2">{motor.motor_id}</div>
              <div className="px-4 py-2 basis-2/5 grow">{motor.location}</div>
              <div className="px-4 py-2 ">{randomChoice()}</div>
              <div className="px-4 py-2 ">{motor.timestamp}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MotorDropdown;
