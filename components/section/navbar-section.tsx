"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push('/contract/0x576e2bed8f7b46d34016198911cdf9886f78bea7'); // Redirect to 'new-page' when Enter is pressed
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 10) {
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
        isScrolled ? "custom-transparent-bg" : "bg-black "
      } z-50`}
    >
      <div className="max-w-screen-xl mx-44 p-1 flex justify-between items-center">
        <Link href={"/"} className="flex items-center gap-4 p-1.5">
          <img src="/images/logo.png" alt="logo" className="h-12 w-12" />
          <p className="text-primary-red font-bold text-lg">BlockScan</p>
        </Link>
        <div className="relative w-48 md:w-72  ">
          {isScrolled && (
          <input
            type="text"
            placeholder="Search a contract"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className={`rounded-lg p-1.5 pl-10 pr-2 w-full outline-none text-[14px] border-2 border-white bg-transparent text-white`}
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
  );
};

export default Navbar;
