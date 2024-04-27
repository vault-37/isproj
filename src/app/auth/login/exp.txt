"use client";
import { useState, useEffect } from "react";

const Login = () => {
  const [isAdmin, setisAdmin] = useState(false);
  const [isLogin,setisLogin] = useState(true);
  useEffect(() => {
    let nl = document.forms[0].elements["userType"];
    for (let el of nl)
    {
        el.addEventListener("click", (e) => {
            if (el.checked && el.value=="admin") setisAdmin(()=>true);
            if (el.checked && el.value=="user") setisAdmin(()=>false);
        });
    }
    },[]);
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="max-w-sm mx-auto">
          <div className="border-t-2 border-blue-500 mb-5"></div>{" "}
          {/* Thin blue line */}
          <form className="bg-white p-8 rounded-lg shadow-lg">
            {/* Radio buttons for user and admin */}

            {/* Title "Login" */}
            <h2 className="text-3xl font-semibold mb-5 text-center text-black">
              Login
            </h2>

            <div className="flex justify-around mb-5">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="user-radio"
                  value="user"
                  name="userType"
                  className="mr-2"
                />
                <label
                  htmlFor="user"
                  className="text-lg font-medium text-black"
                >
                  User
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="admin-radio"
                  value="admin"
                  name="userType"
                  className="mr-2"
                />
                <label
                  htmlFor="admin"
                  className="text-lg font-medium text-black"
                >
                  Admin
                </label>
              </div>
            </div>
            {/* Email and Password fields */}
            {isAdmin && (
              <div className="mb-5">
                <label
                  htmlFor="secret-key"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Secret key
                </label>
                <input
                  type="password"
                  id="secret-key"
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
            )}

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black"
              >
                Email
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
                Password
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
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </div>
            <div className="flex justify-center">
              {isLogin && (
                <h2 className="ms-2 text-sm font-medium text-black">
                  Register here
                </h2>
              )}
              {!isLogin && (
                <h2 className="ms-2 text-sm font-medium text-black">
                  Login here
                </h2>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
