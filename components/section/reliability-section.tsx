import React from 'react';
import  {motion} from "framer-motion"; // Animation library

// Animation configuration for fading up elements
const fadeUp = {
    hidden: {opacity: 0, y: 50},
    reveal: {opacity: 1, y: 0},
}

//section used in home page for advertising the company reputation
const ReliabilitySection = () => {
  return (
    <main className='bg-black overflow-hidden'>
        {/* Decorative background elements */}
        <div className='dot hidden lg:flex'></div>
        <div className='dot2 hidden lg:flex'></div>

            {/* Title section */}
            <h2 className="white text-center pt-[50px]  font-bold xl:pt-[200px] text-[30px] sm:text-5xl xl:text-6xl px-4 leading-[52px]" 
                style={{filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))'}}>
                Secure and Reliable Blockchain Solution
            </h2>
            {/* Subtitle section */}
            <p className="text-white text-center py-2 xl:pb-[100px] xl:text-2xl px-4 text-[16px] sm:text-base">Get the lowest fees, fastest transactions, powerful APIs, and more</p>
            {/* Section for media content */}
            <section className="max-w-7xl mx-auto flex flex-col smp:flex-row items-between justify-between mt-10 sm:pb-[170px] gap-12  px-4 sm:px-6 lg:px-8 z-50" >
                <motion.div 
                className="flex flex-col justify-center  xl:mb-0"
                initial='hidden'
                whileInView='reveal'
                transition={{ staggerChildren: 0.2 }}
                >

                    <motion.div 
                    className="flex justify-center smp:justify-end xl:justify-start items-center my-auto pb-4 xl:pb-6"
                    transition={{duration: 0.5, delay:0.2}}
                    variants={fadeUp}>
                        <p className="font-bold text-primary-red text-5xl sm:text-7xl xl:text-8xl text-shadow-glow-red" style={{ filter: 'drop-shadow(0 0 10px rgba(231, 33, 6, 0.6))' }}>+15,000</p>
                        <p className="text-white text-[18px] xl:text-3xl sm:text-[27px] font-semibold ml-4">daily active users.</p>
                    </motion.div>

                    <motion.div 
                    className="flex justify-center smp:justify-end xl:justify-start items-center my-auto pb-4 xl:pb-6"
                    transition={{duration: 0.5, delay:0.4}}
                    variants={fadeUp}>
                        <p className="font-bold text-pink-500 text-5xl sm:text-7xl xl:text-8xl" style={{ filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.6))' }}>+1,500</p>
                        <p className="text-white text-[18px] xl:text-3xl sm:text-[27px] font-semibold ml-4">unique tokens tracked.</p>
                    </motion.div>


                    <motion.div 
                    className="flex justify-center smp:justify-end xl:justify-start items-center my-auto pb-4 xl:pb-6"
                    transition={{duration: 0.5, delay:0.6}}
                    variants={fadeUp}>
                        <p className="font-bold text-pink-600 text-5xl sm:text-7xl xl:text-8xl text-shadow-glow-red" style={{ filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.5))' }}>+3,000</p>
                        <p className="text-white text-[18px] xl:text-3xl sm:text-[27px] font-semibold ml-4">smart contracts analyzed.</p>
                    </motion.div>



                </motion.div> 
                <div className="flex flex-1 items-center justify-center ">
                    <video
                        autoPlay
                        loop
                        muted 
                        src="/videos/video-5.mp4"
                        className="h-auto w-auto rounded-xl object-cover mb-10 sm:mb-0"
                    />
                </div>   
            </section>
            
        

    </main>
    
  )
}

export default ReliabilitySection