import Image from "next/image";
import LoginButton from "./LoginButton";
export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-around justify-center items-center h-screen">
        <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          GAIL Project
        </h2>
      <LoginButton />
      </div>
    </>
  );
}
