"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      // Adjust the value as needed
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`sticky top-0 px-4 md:px-8 lg:px-12 xl:px-36 duration-300 ${
        isScrolled ? "custom-transparent-bg" : "bg-transparent"
      } z-50`}
    >
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
        <Link href={"/"} className="flex items-center gap-4">
          <img src="images/logo.png" alt="logo" className="h-8 w-8" />
          <p className="text-primary-red">BlockScan</p>
        </Link>
        <div className="relative w-48 md:w-72">
          <input
            type="email"
            placeholder="Enter wallet address"
            className={`rounded-lg p-1.5 pl-10 pr-2 w-full outline-none text-[14px] border-2 border-white `}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
            <img
              src="images/magnifying-glass-2.png"
              alt="search-bar"
              className="w-5 h-5"
            />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
