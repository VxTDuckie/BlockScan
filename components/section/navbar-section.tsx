import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useScanning, ScanningNotification } from '@/components/index';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isScanning } = useScanning();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className={`
      fixed top-0 left-0 right-0 
      duration-300 
      ${isScrolled ? "bg-[rgba(5,4,4,0.5)] backdrop-blur-sm" : "bg-transparent"}
      z-50
    `}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <div className='flex items-center'>
              <div className='flex items-center gap-2'>
                <img 
                  src="/images/logo.png" 
                  alt="logo" 
                  className="h-8 w-8 sm:h-11 sm:w-11" 
                />
                <p className="bg-gradient-to-r from-primary-red to-pink-600 text-transparent bg-clip-text font-semibold text-xl sm:text-[20px]">
                  BlockScan
                </p>
              </div>
              <div className="h-8 mx-4 border-l border-subtitle__gray"></div>
              <div>
                <p className='text-gray-300 text-[12px]'>Powered by</p>
                <img 
                  src='/images/swinburne-univeristy-logo.webp' 
                  alt='swin logo' 
                  className='w-[70px]'
                />
              </div>
            </div>
          </Link>

          <div className='text-white'>
            <div className='hidden sm:flex gap-12 font-semibold'>
              <a href='/projects' className='hover:text-primary-red transition-colors'>
                PROJECTS
              </a>
              <a 
                href='https://docs.google.com/forms/d/e/1FAIpQLSd4P-PJ7yR1Eol75cZW3-9d8JtTOwqQv6hDm6cmoNg90LUHrA/viewform?usp=sf_link' 
                target='_blank'
                className='hover:text-primary-red transition-colors'
              >
                CONTACT SUPPORT
              </a>
            </div>
          </div>

          <button
            className="sm:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16m-7 6h7" 
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden mt-4 pb-4 bg-[rgba(5,4,4,0.9)] rounded-lg p-4">
            <div className="flex flex-col gap-4">
              <a href='/projects' className='text-white hover:text-primary-red transition-colors'>
                PROJECTS
              </a>
              <a 
                href='https://docs.google.com/forms/d/e/1FAIpQLSd4P-PJ7yR1Eol75cZW3-9d8JtTOwqQv6hDm6cmoNg90LUHrA/viewform?usp=sf_link' 
                target='_blank'
                className='text-white hover:text-primary-red transition-colors'
              >
                CONTACT SUPPORT
              </a>
            </div>
          </div>
        )}
      </nav>

      {isScanning && <ScanningNotification />}
    </div>
  );
};

export default Navbar;