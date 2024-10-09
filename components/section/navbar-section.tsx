"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useScanning, ScanningNotification} from "@/components/index";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { isScanning, handleKeyPress } = useScanning();

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };  
  }, []);

  return (
    <div className={`sticky top-0 duration-300 ${
      isScrolled ? "custom-transparent-bg" : "bg-black"
    } z-50`}>  
      <nav className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href={"/"} className="flex items-center gap-2 sm:gap-4">
            <img src="/images/logo.png" alt="logo" className="h-8 w-8 sm:h-12 sm:w-12" />
            <p className="text-primary-red font-semibold text-xl sm:text-2xl">BlockScan</p>
          </Link>
          
          <div className="hidden sm:block relative w-48 md:w-72">
            {isScrolled && (
              <input
                type="text"
                placeholder="Search a contract"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, inputValue)}
                className="rounded-full p-1.5 pl-10 pr-2 w-full outline-none text-[14px] border-2 border-white bg-transparent text-white"
              />
            )}
            {isScrolled && (
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
                <img
                  src="/images/magnifying-glass.png"
                  alt="search-bar"
                  className="w-5 h-5"
                />
              </span>
            )}
          </div>
        </div>
      </nav>

      {isScanning && <ScanningNotification/>}
    </div>
  );
};

export default Navbar;