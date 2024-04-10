"use client"
import {useState} from "react"
import YourComponent from "./gtry";
import MotorDropdown from "./list";
// import DrawerComponent from "./drawer";
import Navbar from "./navbar";
import BlogCard from "./Card";
// import from '@material-ui/icons/motor';

const dashboard = () => {
  const [motor_id,setmotor_id] = useState();
  const [user, setuser] = useState("Admin");
  return (
    <>
      <div className="relative">
        {/* <Navbar /> */}
        <div className="absolute top-full left-0 right-0 shadow-md z-10">
          <div className="container mx-auto px-4 py-6">
            <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-800 md:text-4xl lg:text-4xl">
              Hello:{" "}
              <mark className="px-2 text-gray-800 bg-yellow-200 rounded">
                {user}
              </mark>
            </h2>
          </div>
        </div>
      </div>
      <div className="dashboard-page flex flex-col justify-around justify-center items-center h-screen space-y-5">
        <div className="flex flex-row space-x-6">
          <BlogCard subj="Not Working Motors" num={6} />
          <BlogCard subj="Working Motors" num={10} />
          <BlogCard subj="Faulty Motors" num={1} />
        </div>
        <MotorDropdown foo={setmotor_id} />
        <YourComponent motor_id={motor_id} />
      </div>
    </>
  );
};

export default dashboard;
