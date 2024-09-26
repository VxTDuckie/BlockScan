import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/section/Navbar";
import Footer from "@/components/section/Footer";
import CustomCursor from "@/components/CustomCursor";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BlockScan",
  description: "An effective scanner for you.",
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <CustomCursor/>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
