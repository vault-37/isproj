import { Inter } from "next/font/google";
import "./globals.css";
import "dotenv/config";
// import "pg";
import { Pool } from "pg";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GAIL Project",
  description: "Dashboard for sumthing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
