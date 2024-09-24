import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import  { Navbar }  from "@/components";
import { Footer } from "@/components";
import { Hero } from "@/components";

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
  title: "JBiz",
  description: "Trace the money flow like an expert",
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
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
