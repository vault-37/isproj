"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation"; // if you're using Next.js for navigation
import Link from "next/link";

const Register = () => {
  const [userType, setUserType] = useState("regular");
  const router = useRouter(); // for navigation within Next.js

  useEffect(() => {
    // Ensure Formik's user_type field aligns with userType state
    formik.setFieldValue("user_type", userType);
  }, [userType]); // Triggered when userType changes

  const validationSchema = Yup.object({
    user_name: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    user_type: Yup.string().required("User type is required"),
    designation: Yup.string().required("Designation is required"),
    email_id: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      user_name: "",
      password: "",
      user_type: "regular",
      designation: "",
      email_id: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const requestBody = {
        user_name: values.user_name,
        password: values.password,
        user_type: userType,
        designation: values.designation,
        email_id: values.email_id,
      };

      try {
        const response = await fetch(
          "http://localhost:8000/api/user/register/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("User registered:", data); // handle successful registration
          router.push("/auth/login"); // navigate to login after successful registration
        } else {
          console.error("Registration failed");
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
            Register
          </h2>

          {/* Dropdown for user type */}
          <div className="mb-5">
            <label
              htmlFor="user_type"
              className="block mb-2 text-sm font-medium text-black"
            >
              User Type
            </label>
            <select
              id="user_type"
              name="user_type"
              value={formik.values.user_type}
              onChange={(e) => {
                formik.handleChange(e);
                setUserType(e.target.value); // Update state with selected user type
              }}
              onBlur={formik.handleBlur}
              className={`bg-gray-50 border ${
                formik.touched.user_type && formik.errors.user_type
                  ? "border-red-500"
                  : "border-gray-300"
              } text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            >
              <option value="regular">Regular</option>
              <option value="admin">Admin</option>
            </select>
            {formik.touched.user_type && formik.errors.user_type ? (
              <div className="text-red-500">{formik.errors.user_type}</div>
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="user_name"
              className="block mb-2 text-sm font-medium text-black"
            >
              Username
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              value={formik.values.user_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`bg-gray-50 border ${
                formik.touched.user_name && formik.errors.user_name
                  ? "border-red-500"
                  : "border-gray-300"
              } text-black text-sm rounded-lg focus:ring-blue-500 focus/border-blue-500 block w/full p-2.5`}
            />
            {formik.touched.user_name && formik.errors.user_name ? (
              <div className="text-red-500">{formik.errors.user_name}</div>
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
              } text-black text-sm rounded-lg focus:ring-blue-500 focus/border-blue-500 block w/full p-2.5`}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="email_id"
              className="block mb-2 text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              type="email"
              id="email_id"
              name="email_id"
              value={formik.values.email_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`bg-gray-50 border ${
                formik.touched.email_id && formik.errors.email_id
                  ? "border-red-500"
                  : "border-gray-300"
              } text-black text-sm rounded-lg focus/ring-blue-500 focus/border-blue-500 block w/full p-2.5`}
            />
            {formik.touched.email_id && formik.errors.email_id ? (
              <div className="text-red-500">{formik.errors.email_id}</div>
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="designation"
              className="block mb-2 text-sm font-medium text-black"
            >
              Designation
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={formik.values.designation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`bg-gray-50 border ${
                formik.touched.designation && formik.errors.designation
                  ? "border-red-500"
                  : "border-gray-300"
              } text-black text-sm rounded-lg focus/ring-blue-500 focus/border-blue-500 block w/full p-2.5`}
            />
            {formik.touched.designation && formik.errors.designation ? (
              <div className="text-red-500">{formik.errors.designation}</div>
            ) : null}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover/bg-blue-800 focus:ring-4 focus:outline-none focus/ring-blue-300 font-medium rounded-lg text-sm w/full sm/w-auto px-5 py-2.5 text-center"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Register
            </button>
          </div>

          <div className="flex justify-center mt-5">
            <span className="ms-2 text-sm font-medium text-black">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-700">
                Login here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
