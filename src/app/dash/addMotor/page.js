"use client"
import { useState } from "react";

async function addMotor(motorData) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch("http://localhost:8000/api/motor/add-motor/", {
      method: "POST",
      headers: {
        accept: "application/json",
        token:
          token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(motorData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Motor added successfully:", data);
      alert(data.message);
      // Do something with the response if needed
    } else {
      console.error("Failed to add motor:", response.statusText);
    }
  } catch (error) {
    console.error("Error adding motor:", error);
  }
}

function AddMotorForm() {
  const [motorID, setMotorID] = useState("");
  const [powerRating, setPowerRating] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const motorData = {
      motor_id: motorID,
      power_rating: powerRating,
      location: location,
    };
    await addMotor(motorData);
  };

  return (
    <section className="bg-white h-screen">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Add a new Motor
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="motorID"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Motor ID
              </label>
              <input
                type="text"
                name="motorID"
                id="motorID"
                value={motorID}
                onChange={(e) => setMotorID(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type motor ID"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="powerRating"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Power Rating
              </label>
              <input
                type="text"
                name="powerRating"
                id="powerRating"
                value={powerRating}
                onChange={(e) => setPowerRating(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Motor power rating"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="location"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Motor location"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
          >
            Add Motor
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddMotorForm;
