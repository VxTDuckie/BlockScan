"use client";
import React from 'react';
import Link from 'next/link';
import splitString from '@/app/utils/splitText';
import  {motion} from "framer-motion";
import { useScanning } from '@/components/index';




const heading1 = 'Your Trusted Scanner';
const heading2 = ' for Fast and Safe Blockchain Transactions';
const subtitle = 'Built all-in-one, BlockScan helps you get used to cryptocurrency.';
const charVariants = {
    hidden: {opacity: 0},
    reveal: {opacity: 1},
}



const Hero = () => {
    const splitHeading1 = splitString(heading1);
    const splitHeading2 = splitString(heading2);
    const splitSubtitle = splitString(subtitle);
    const {isScanning, startScanning} = useScanning();
    const handleFileUpload = () => {
        startScanning('');
    }


    return (
        <div className="flex flex-col xl:flex-row max-w-7xl mx-auto gap-8 mb-16 xl:mb-28 min-h-[600px] xl:h-[800px] items-center px-4 sm:px-6 lg:px-8">
            
            {/* Text content */}
            <div className="flex-1 xl:flex-[2] flex items-center justify-center">
                <div>
                    <motion.h1 
                    className="hero__title text-primary-red text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-relaxed xl:leading-relaxed mb-4 xl:mb-6"
                    initial="hidden"
                    whileInView="reveal"
                    transition={{staggerChildren: 0.03}}
                    >
                        <span style={{filter: 'drop-shadow(0 0 10px rgba(231, 33, 6, 0.5))',}}>{splitHeading1.map(char =>
                            <motion.span key={char} transition={{duration: 0.5}} variants={charVariants}>
                                {char}
                            </motion.span>
                        )}</span>
                        <span className="text-white" style={{filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',}}>
                            {splitHeading2.map(char =>
                                <motion.span key={char} transition={{duration:0.5}} variants={charVariants}>
                                    {char}
                                </motion.span>
                            )}
                        </span>
                    </motion.h1>
                    <motion.p 
                        className="hero__subtitle text-white text-lg sm:text-xl lg:text-2xl mb-8 xl:mb-14"
                        initial='hidden'
                        whileInView='reveal'
                        transition={{
                            staggerChildren: 0.01,
                            delayChildren: 2,
                        }}
                    >
                        {splitSubtitle.map( char =>
                            <motion.span key={char} transition={{duration: 0.5}} variants={charVariants}>
                                {char}
                            </motion.span>
                        )}
                    </motion.p>

                   
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 xl:space-x-6 mt-8 xl:mt-14">
                        <label className='justify-center white rounded-xl text-base sm:text-lg xl:text-[20px] font-normal p-3 xl:p-4 w-full sm:w-auto border-2 border-white shadow-weak-ass-glow hover:bg-white hover:text-black transition-colors duration-300 '>
                            Upload a contract
                            <input
                                type="file"
                                accept=''
                                className="hidden" 
                                onChange={handleFileUpload}
                            />
                
                        </label>
                        <p className='text-xl sm:text-2xl xl:text-3xl white font-light px-2 xl:px-4'>or </p>
                        <Link href='/contract'>
                            <p className='border-2 p-3 xl:p-4 rounded-xl text-base sm:text-lg xl:text-[20px] font-normal white px-3 xl:px-4 shadow-weak-ass-glow hover:bg-white hover:text-black transition-colors duration-300 w-full sm:w-auto text-center'>
                                Explore more in Contract list
                            </p>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Video content */}
            <div className="flex-1  flex items-center justify-center xl:justify-end mt-8 xl:mt-0">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    src="/videos/video-6.mp4" 
                    className="h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[700px] w-full xl:w-auto rounded-lg object-cover object-center"
                />   
            </div>
            {isScanning && (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-12 max-w-[500px] mx-auto">
          <p className="text-4xl font-semibold mb-4">Hold up!</p>
          <p className="flex items-center gap-2 text-2xl">
            <svg className="animate-spin h-10 w-10 text-primary-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

export default Hero;