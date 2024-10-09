"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useScanning } from "../feature/useScanning";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <div className={`sticky top-0 px-4 sm:px-6 lg:px-8 duration-300 ${
      isScrolled ? "custom-transparent-bg" : "bg-black"
    } z-50`}>  
      <nav className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-4">
          <Link href={"/"} className="flex items-center gap-2 sm:gap-4">
            <img src="/images/logo.png" alt="logo" className="h-8 w-8 sm:h-12 sm:w-12" />
            <p className="text-primary-red font-bold text-xl sm:text-3xl">BlockScan</p>
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

          <button 
            className="sm:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden mt-4 pb-4">
            <input
              type="text"
              placeholder="Search a contract"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, inputValue)}
              className="rounded-full p-1.5 pl-10 pr-2 w-full outline-none text-[14px] border-2 border-white bg-transparent text-white"
            />

          </div>
        )}
      </nav>

      {isScanning && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 sm:p-12 max-w-[90%] sm:max-w-[500px] mx-auto">
              <p className="text-2xl sm:text-4xl font-semibold mb-4">Hold up!</p>
              <p className="flex items-center gap-2 text-xl sm:text-2xl">
                <svg className="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-primary-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Contract is being scanned
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;