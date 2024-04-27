"use client";
import { useState, useEffect } from "react";
import { Bars } from "react-loader-spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page2 = () => {
  const [submissions, setSubmissions] = useState([]);
  const router = useRouter()

useEffect(() => {
  const fetchSubmissions = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/motor/all-motor-ids",
        {
          cache: "no-store",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTI4IiwiZXhwIjoxNzE0NzA0ODg5fQ.S4GbzSVZGjLd624XmjJHbOMKYYSM7QSjwRBBUfgwouM",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch submissions");
      }

      const data = await response.json();
      setSubmissions(data.rows);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      // Handle errors, e.g., display error message to the user
    }
  };

  fetchSubmissions();
}, []);

  return (
    <div className="flex-col space-y-20">
      {/* <Navbar /> */}
      <div className="mx-auto max-w-7xl ">
        {/* {isModalOpen && sub !== null && (
          <Modal closeModal={toggleModal} submission={sub} />
        )} */}
        <h1 className="text-2xl font-bold mb-4 mt-4">All Motors</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-100%">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-[#ffedd5] ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Motor ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Power Rating
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Healthcard
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {submissions.length==0 && (
              <Bars
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass="w-full flex justify-around"
                visible={true}
              />
            )} */}
              {submissions &&
                submissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {submission.motor_id}
                    </th>
                    <td className="px-6 py-4">{submission.location}</td>
                    <td className="px-6 py-4">{submission.power_rating}</td>
                    <td className="px-6 py-4">
                      {Math.random() < 0.5 ? "working" : "faulty"}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`./motor/${submission.motor_id}/`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() =>
                          router.push(`./motor/${submission.motor_id}/`)
                        }
                      >
                        Healthcard
                      </Link>
                    </td>
                  </tr>
                ))}
              {/* Repeat similar tr elements for other data */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page2;
