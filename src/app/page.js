"use client"
import Image from "next/image";
import LoginButton from "./LoginButton";
import HelpButton from "./HelpButton";
// import Wrapper from "./wrapper";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center px-4 py-2 bg-gray-100">
        {/* Header components with logos */}
          <img src="images/gail.png" width={50}  />
          <img src="images/Logo.png" width={50} />
      </header>
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">
          <span className="text-blue-600">Motor</span>{" "}
          <span className="text-gray-800">Condition</span>{" "}
          <span className="text-blue-600">Monitoring</span>
        </h1>
        <p className="text-gray-600 mb-4">
          Project Under: Gas India Ltd (GAIL)
        </p>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {/* Render the chart or data visualization component */}
        </div>
        <button 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={()=>router.push("./login")}>
          Login/Register
        </button>
      </main>
      <footer className="bg-gray-200 py-2 text-center">
        {/* Footer components */}
      </footer>
    </div>
  );
}
