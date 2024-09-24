"use client";
import React from 'react';
import CustomButton from './CustomButton';
import Navbar from './Navbar';

const Hero = () => {
    const handleScroll = () => {
        // Add your scroll logic here
    };

    return (
        <div className="flex max-w-screen-xl mx-auto lg:py-10 gap-8 mb-24 h-[800px] items-center">
            
            {/* Text content */}
            <div className="flex-[2] flex items-center justify-center px-6">
                <div>
                    <h1 className="hero__title text-primary-red">
                        <span style={{filter: 'drop-shadow(0 0 10px rgba(231, 33, 6, 0.5))',}}>Your Trusted Scanner </span><span className="text-white" style={{filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',}}>for Fast and Safe Blockchain Transactions</span>
                    </h1>
                    <p className="hero__subtitle text-white">
                        Built all-in-one, JBiz helps you get used to cryptocurrency.
                    </p>

                    {/* Email input section */}
                    <div className="flex items-center space-x-4 mt-10">
                        <input
                            type="email"
                            placeholder="Enter wallet address"
                            className="rounded p-2 w-64 border-2 border-white shadow-weak-ass-glow"
                        />
                        <CustomButton 
                            icon={<img src='images/magnifying-glass.png' alt='icon' className='w-5 h-5 flex' />}
                            title="Search"
                            containerStyles="bg-primary-red text-white rounded-full px-4 py-5 shadow-glow-red"
                            handleClick={handleScroll} 
                        />
                    </div>
                </div>
            </div>

            {/* Video content */}
            <div className="flex-[1] px-6 flex items-center justify-end"> {/* Added flex and justify-end */}
                <video 
                    autoPlay 
                    loop 
                    muted 
                    src="/videos/video-6.mp4" 
                    className="h-[590px] rounded-lg object-cover object-center"
                />   
            </div>

        </div>
    );
};

export default Hero;
