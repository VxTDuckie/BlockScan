import React from 'react';
import  {motion} from "framer-motion";
import { duration } from 'html2canvas/dist/types/css/property-descriptors/duration';

const fadeUp = {
    hidden: {opacity: 0, y: 50},
    reveal: {opacity: 1, y: 0},
}
const ReliabilitySection = () => {
  return (
    <main>
        <h1 className="text-white text-center header mt-8 xl:mt-[200px] text-2xl sm:text-3xl xl:text-6xl px-4" 
                style={{filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'}}>
                Secure and Reliable Blockchain Solution
            </h1>
            <p className="text-white text-center py-2 xl:py-4 xl:text-2xl px-4 text-sm sm:text-base">Get the lowest fees, fastest transactions, powerful APIs, and more</p>
            <section className="max-w-screen-xl mx-auto flex flex-col xl:flex-row items-center justify-between mt-10 xl:mt-20 mb-24 xl:mb-28 px-4 gap-12" >
                <motion.div 
                className="flex flex-col justify-center xl:flex-1 mb-10 xl:mb-0"
                initial='hidden'
                whileInView='reveal'
                transition={{ staggerChildren: 0.2 }}
                >
                    
                    <motion.div 
                    className="flex items-center mb-12"
                    transition={{duration: 0.5, delay:0.2}}
                    variants={fadeUp}>
                        <p className="font-bold text-primary-red text-5xl sm:text-6xl xl:text-8xl text-shadow-glow-red" style={{ filter: 'drop-shadow(0 0 10px rgba(231, 33, 6, 0.5))' }}>+15,000</p>
                        <p className="text-white text-xl sm:text-2xl xl:text-[27px] font-semibold ml-4">daily active users.</p>
                    </motion.div>

                    <motion.div 
                    className="flex items-center mb-12"
                    transition={{duration: 0.5, delay:0.4}}
                    variants={fadeUp}>
                        <p className="font-bold text-primary-red text-5xl sm:text-6xl xl:text-8xl text-shadow-glow-red" style={{ filter: 'drop-shadow(0 0 10px rgba(231, 33, 6, 0.5))' }}>+1,500</p>
                        <p className="text-white text-xl sm:text-2xl xl:text-[27px] font-semibold ml-4">unique tokens tracked.</p>
                    </motion.div>


                    <motion.div 
                    className="flex items-center mb-12"
                    transition={{duration: 0.5, delay:0.6}}
                    variants={fadeUp}>
                        <p className="font-bold text-primary-red text-5xl sm:text-6xl xl:text-8xl text-shadow-glow-red" style={{ filter: 'drop-shadow(0 0 10px rgba(231, 33, 6, 0.5))' }}>+3,000</p>
                        <p className="text-white text-xl sm:text-2xl xl:text-[27px] font-semibold ml-4">smart contracts analyzed.</p>
                    </motion.div>



                </motion.div> 
                <div className="flex flex-1 items-center justify-center">
                    <video
                        autoPlay
                        loop
                        muted 
                        src="/videos/video-5.mp4"
                        className="h-full w-full xl:h-4/4 xl:w-4/4 rounded-lg object-cover"
                    />
                </div>   
            </section>
    </main>
    
  )
}

export default ReliabilitySection