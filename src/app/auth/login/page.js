"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  // Default to non-admin (user) role
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const radioButtons = document.forms[0]?.elements["userType"];
    if (radioButtons) {
      const clickHandler = (e) => {
        const isAdminRadio = e.target.value === "admin";
        setIsAdmin(isAdminRadio);
      };
      // Attach event listeners to radio buttons
      for (let el of radioButtons) {
        el.addEventListener("click", clickHandler);
      }
      // Clean up event listeners to avoid memory leaks
      return () => {
        for (let el of radioButtons) {
          el.removeEventListener("click", clickHandler);
        }
      };
    }
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    secretKey: isAdmin
      ? Yup.string().required("Secret key is required")
      : Yup.mixed().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      secretKey: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const requestBody = {
        email_id: values.email,
        password: values.password,
        user_type: isAdmin ? "admin" : "regular",
        secret_key: isAdmin ? values.secretKey : "",
      };

      try {
        const response = await fetch("http://localhost:8000/api/user/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
           const data = await response.json();

           // Create a promise to ensure localStorage is updated before navigation
           const setLocalStoragePromise = new Promise((resolve, reject) => {
             try {
               localStorage.setItem("authToken", data.token);
               localStorage.setItem("userId", data.user_id);
               resolve(); // Resolve when storage operations complete
             } catch (error) {
               reject(error); // Reject if there's an error
             }
           });

           await setLocalStoragePromise; // Wait for the Promise to resolve before navigating
           console.log("Login successful", data);

           // Navigate to the dashboard after localStorage is set
           router.push("/dash");
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-sm mx-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
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
                checked={!isAdmin} // Default to non-admin (user role)
                onChange={() => setIsAdmin(false)}
              />
              <label
                htmlFor="user-radio"
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
                checked={isAdmin} // Default to admin if isAdmin is true
                onChange={() => setIsAdmin(true)}
              />
              <label
                htmlFor="admin-radio"
                className="text-lg font-medium text-black"
              >
                Admin
              </label>
            </div>
          </div>

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
                name="secretKey"
                value={formik.values.secretKey}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`bg-gray-50 border ${
                  formik.touched.secretKey && formik.errors.secretKey
                    ? "border-red-500"
                    : "border-gray-300"
                } text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w/full p-2.5`}
              />
              {formik.touched.secretKey && formik.errors.secretKey ? (
                <div className="text-red-500">{formik.errors.secretKey}</div>
              ) : null}
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
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`bg-gray-50 border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } text-black text-sm rounded-lg focus:ring-blue-500 focus/border-blue-500 block w/full p-2.5`}
              placeholder="name@flowbite.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
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
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`bg-gray-50 border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } text-black text-sm rounded-lg focus/ring-blue-500 focus/border-blue-500 block w/full p-2.5`}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus/ring-3 focus/ring-blue-300"
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-black"
            >
              Remember me
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus/ring-4 focus/outline-none focus/ring-blue-300 font-medium rounded-lg text-sm w/full sm/w-auto px-5 py-2.5 text-center"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Submit
            </button>
          </div>

          <div className="flex justify-center mt-5">
            <span className="ms-2 text-sm font-medium text-black">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-blue-700">
                Register here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
