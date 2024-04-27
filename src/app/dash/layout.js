"use client"
import Wrapper from "./Wrapper";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      // Redirect to the login page if there's no token
      router.push("/auth/login");
    }
    // If there's a token, no action is needed; the user is authenticated
  }, [router]); // Dependency on `router` to avoid stale reference
  return (
    <>
      <div>
        <Wrapper />
        <main>{children}</main>
      </div>
    </>
  );
}
