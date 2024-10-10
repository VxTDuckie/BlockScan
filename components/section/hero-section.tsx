"use client";
import React from 'react';
import Link from 'next/link';
import  {motion} from "framer-motion";
import { useScanning,ScanningNotification, splitString } from '@/components/index';
import ParticlesComponent from '@/components/utils/particles';



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
        <div className="flex flex-col xl:flex-row max-w-7xl mx-auto gap-8 mb-16 xl:mb-28 min-h-[600px] xl:h-[800px] items-center px-4 sm:px-6 xl:px-0">
        <ParticlesComponent id='particles'/>
            {/* Text content */}
            <div className="flex-1 xl:flex-[2] flex items-center justify-center ">
                <div>
                    <motion.h1 
                    className="hero__title text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] leading-relaxed xl:leading-relaxed mb-4 xl:mb-6 animate-fadeUp"
                    initial="hidden"
                    whileInView="reveal"
                    transition={{staggerChildren: 0.03}}
                    
                    >
                        <span
                        className=' text-primary-red '
                        style={{filter: 'drop-shadow(0 0 10px rgba(231, 33, 6, 0.8))',}}>{splitHeading1.map(char =>
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
                        className="hero__subtitle text-white text-lg sm:text-xl lg:text-2xl mb-8 xl:mb-16"
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
                        <label className='justify-center text-black rounded-xl text-base sm:text-lg xl:text-[20px] font-normal p-3 xl:p-4 w-full sm:w-auto hover:bg-white hover:text-white
                        bg-gradient-to-r from-primary-red via-pink-500 to-purple-600 shadow-glow-red 
                        hover:bg-gradient-to-r  hover:from-hard-red hover:to-primary-red transition-colors duration-300'>
                            Upload a contract
                            <input
                                type="file"
                                accept='.sol'
                                className="hidden" 
                                onChange={handleFileUpload}
                            />
                
                        </label>
                        <p className='text-xl sm:text-2xl xl:text-3xl white font-light px-2 xl:px-4'>or </p>
                        <Link href='/contract'>
                            <p className='border-2 border-white p-3 xl:p-[14px] rounded-xl text-base sm:text-lg xl:text-[20px] font-normal px-3 xl:px-4 hover:bg-white
                             text-white hover:text-pink-500 transition-colors duration-300 w-full sm:w-auto text-center'>
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
            {isScanning && <ScanningNotification/>}
        </div>
    );
};

export default Hero;