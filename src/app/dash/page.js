"use client"
import {useState} from "react"
import YourComponent from "./gtry";
// import MotorDataGraph from "./graphs";
import MotorDropdown from "./list";

const dashboard = () => {
  const [motor_id,setmotor_id] = useState();
  return (
    <>
      <div className="flex flex-col justify-around justify-center items-center h-screen">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Dashboard
        </h2>
        <MotorDropdown foo={setmotor_id} />
        <YourComponent motor_id={motor_id} />
        {/* <MotorDataGraph /> */}
      </div>
    </>
  );
};

export default dashboard;
