
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";




export const metadata: Metadata = {
  title: "QuraniQ -ai based quran assistant",
  description: "QuraniQ is an AI-based Quran assistant that provides personalized guidance and support for Quranic studies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
