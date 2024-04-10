"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MotorDataGraph from "../../g2";

import { Bars } from "react-loader-spinner";
import { ArrowBack } from "@mui/icons-material";
import jsPDF from "jspdf";

async function genpdf(motorId) {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTI4IiwiZXhwIjoxNzEzMzE0NzU5fQ.jPcLcoZTXtxNZ6qx43ZV3mOWiGI_Fp0_RShAAFHqhrw"; // Replace with the actual JWT token

    const response = await fetch(
      `http://localhost:8000/api/motor/report/${motorId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error generating PDF: ${errorData.detail}`);
    }

    const blob = await response.blob();
    const pdfUrl = URL.createObjectURL(blob);

    // Open the PDF in a new window or handle the PDF data as needed
    window.open(pdfUrl, "_blank");
  } catch (error) {
    console.error("Error generating PDF:", error);
    // Handle the error, e.g., display an error message to the user
  }
}

export default function Healthcard() {
  const params = useParams();
  const router = useRouter();

  const [motor_id, setmotor_id] = useState(params.motor_id);
  const [rows, setRows] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [rul,setrul] = useState(123);

  async function fetchRows() {
    try {
      const response = await fetch("../../api/lr", {
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

  useEffect(() => {
    console.log("motor_id: ", params.motor_id);
    fetchRows();
  }, []);

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

  const generatePDF = async () => {
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

    // doc.save("motor_data_with_stats.pdf");
    // Automatically open the print dialog after saving the PDF
    // doc.autoPrint();
    doc.output("dataurlnewwindow");
  };

  return (
    <div className="flex flex-col justify-around space-y-3">
      <div className="container mx-auto px-4 py-6 flex space-x-7 items-start">
        <div className="cursor-pointer" onClick={() => router.back()}>
          <ArrowBack />
        </div>
        <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-white">
          Report for Motor ID:{" "}
          <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
            {motor_id}
          </mark>
        </h2>
      </div>
      {rows === null && (
        <Bars
          height="250"
          width="250"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass="w-full flex justify-around"
          visible={true}
        />
      )}
      
      {rows && 
      (
        <>
        <MotorDataGraph rows={rows} statistics={statistics} />
        <div className="text-2xl text-center">RUL for the motor: {rul}</div>
      <div className="w-1/8 flex justify-around ">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={()=>genpdf(motor_id)}
        >
          Generate Report
        </button>
      </div>
      </>
      )}
    </div>
  );
}
