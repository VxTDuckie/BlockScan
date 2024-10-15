import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useScanning, ScanningNotification } from '@/components/index'; // Custom hook for scanning functionality


//Navigation bar
const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false); // State to track if the user has scrolled
    const [inputValue, setInputValue] = useState(''); // State to hold the value of the search input
    const { isScanning, handleKeyPress } = useScanning(); // Destructuring scanning state and key press handler from custom hook
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to handle scroll events, setting isScrolled based on scroll position
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
    };

    // useEffect to add and remove the scroll event listener
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`sticky top-0 duration-300 ${
            isScrolled ? "bg-[rgba(1,1,1,0.5)] backdrop-blur-sm " : "bg-transparent"
        } z-50`}>
            {/* Navbar container with conditional styling based on scroll state */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link href={"/"} className="flex items-center gap-2 sm:gap-4">
                        {/* Link to the homepage */}
                        <img src="/images/logo.png" alt="logo" className="h-8 w-8 sm:h-12 sm:w-12" />
                        <p className="bg-gradient-to-r from-primary-red via-pink-500 to-purple-600 text-transparent bg-clip-text font-semibold text-xl sm:text-2xl">
                            BlockScan
                        </p>
                    </Link>

                    <div className="hidden sm:block relative w-48 md:w-72">
                        {/* Search bar, displayed only when scrolled */}
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
            <span className="absolute left-7 top-[6.2rem] transform -translate-y-1/2 text-white">
              <img
                src="/images/magnifying-glass.png"
                alt="search-bar"
                className="w-5 h-5"
              />
            </span>
          </div>
        )}
               
            </nav>

      {/* Display scanning notification if scanning is in progress */}
      {isScanning && <ScanningNotification/>}
        </div>
    );
};

export default Navbar;
