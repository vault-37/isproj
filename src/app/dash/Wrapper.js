"use client";
import { useState } from "react";
import Sidebar from "../sidebar";
import Navbar from "./navbar";

export default function Wrapper({isLogin}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar isLogin={isLogin} />
      {/* <div className="flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div> */}
    </>
  );
}
