"use client";

import { useState } from "react";
import MotorDataGraph from "./g2";
import "./dash.css";
import jsPDF from "jspdf";

function YourComponent({ motor_id }) {
  const [rows, setRows] = useState(null);
  const [statistics, setStatistics] = useState(null);

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
        calculateStatistics(data.rows);
      } else {
        console.error("Failed to fetch last row:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching last row:", error);
    }
  }

  const calculateStatistics = (data) => {
    const currentValueArray = data.map((item) => item.current_value);
    const frequencyArray = data.map((item) => item.frequency);

    const currentValueMean =
      currentValueArray.reduce((acc, val) => acc + val, 0) /
      currentValueArray.length;
    const frequencyMean =
      frequencyArray.reduce((acc, val) => acc + val, 0) / frequencyArray.length;

    const sortedCurrentValueArray = [...currentValueArray].sort(
      (a, b) => a - b
    );
    const sortedFrequencyArray = [...frequencyArray].sort((a, b) => a - b);

    const currentValueMedian = calculateMedian(sortedCurrentValueArray);
    const frequencyMedian = calculateMedian(sortedFrequencyArray);

    setStatistics({
      currentValue: {
        mean: currentValueMean,
        median: currentValueMedian,
        // Add more statistics as needed
      },
      frequency: {
        mean: frequencyMean,
        median: frequencyMedian,
        // Add more statistics as needed
      },
    });
  };

  const calculateMedian = (arr) => {
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    // const jsonData = JSON.stringify(rows, null, 2);

    doc.text("Motor Data JSON:", 10, 10);
    // doc.text(jsonData, 10, 20);

    doc.text("Statistics:", 10, 40);
    doc.text(
      `Current Value: Mean - ${statistics.currentValue.mean}, Median - ${statistics.currentValue.median}`,
      10,
      50
    );
    doc.text(
      `Frequency: Mean - ${statistics.frequency.mean}, Median - ${statistics.frequency.median}`,
      10,
      60
    );
    // Add more statistics as needed

    doc.save("motor_data_with_stats.pdf");
    // Automatically open the print dialog after saving the PDF
    doc.autoPrint();
    doc.output("dataurlnewwindow");
  };

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
          onClick={generatePDF}
        >
          Create report
        </button>
      </div>
      <div>
        {rows && <MotorDataGraph rows={rows} statistics={statistics} />}
      </div>
    </div>
  );
}

export default YourComponent;
