import type { Metadata } from "next";
import Navbar from "@/components/section/Navbar";
import Footer from "@/components/section/Footer";
import CustomCursor from "@/components/CustomCursor";



export const metadata: Metadata = {
  title: "BlockScan",
  description: "An effective scanner for you.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CustomCursor/>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
