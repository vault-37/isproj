import "./exp.css";
import logo from "../images/Logo.png";
import gail from "../images/gail.png";
import Image from "next/image";
import LoginButton from "../LoginButton";

export default function Exp() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="max-w-sm mx-auto">
          <div className="border-t-2 border-blue-500 mb-5"></div>{" "}
          {/* Thin blue line */}
          <form className="bg-white p-8 rounded-lg shadow-lg">
            {/* Radio buttons for user and admin */}
            <div className="flex justify-between mb-5">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="user"
                  name="userType"
                  className="mr-2"
                />
                <label
                  htmlFor="user"
                  className="text-sm font-medium text-black"
                >
                  User
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="admin"
                  name="userType"
                  className="mr-2"
                />
                <label
                  htmlFor="admin"
                  className="text-sm font-medium text-black"
                >
                  Admin
                </label>
              </div>
            </div>

            {/* Title "Login" */}
            <h2 className="text-xl font-semibold mb-5 text-center text-black">
              Login
            </h2>

            {/* Email and Password fields */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-black"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  required
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-black"
              >
                Remember me
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
