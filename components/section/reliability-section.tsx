import React from 'react';
import  {motion} from "framer-motion";

const fadeUp = {
    hidden: {opacity: 0, y: 50},
    reveal: {opacity: 1, y: 0},
}
const ReliabilitySection = () => {
  return (
    <main className='bg-black overflow-hidden'>
        <div className='dot'></div>
        <div className='dot2'></div>

        
            <h1 className="text-white text-center header sm:pt-[100px] text-2xl sm:text-5xl xl:text-6xl px-4 leading-[52px]" 
                style={{filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))'}}>
                Secure and Reliable Blockchain Solution
            </h1>
            <p className="text-white text-center py-2 xl:pb-[100px] xl:text-2xl px-4 text-sm sm:text-base">Get the lowest fees, fastest transactions, powerful APIs, and more</p>
            <section className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between mt-10 sm:pb-[170px] gap-12  px-4 sm:px-6 lg:px-8 z-50" >
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
                        <p className="font-bold text-primary-red text-5xl sm:text-6xl xl:text-8xl text-shadow-glow-red" style={{ filter: 'drop-shadow(0 0 10px rgba(231, 33, 6, 0.6))' }}>+15,000</p>
                        <p className="text-white text-xl sm:text-2xl xl:text-[27px] font-semibold ml-4">daily active users.</p>
                    </motion.div>

                    <motion.div 
                    className="flex items-center mb-12"
                    transition={{duration: 0.5, delay:0.4}}
                    variants={fadeUp}>
                        <p className="font-bold text-pink-500 text-5xl sm:text-6xl xl:text-8xl" style={{ filter: 'drop-shadow(0 0 15px 5px rgba(147, 51, 234, 0.6))' }}>+1,500</p>
                        <p className="text-white text-xl sm:text-2xl xl:text-[27px] font-semibold ml-4">unique tokens tracked.</p>
                    </motion.div>


                    <motion.div 
                    className="flex items-center mb-12"
                    transition={{duration: 0.5, delay:0.6}}
                    variants={fadeUp}>
                        <p className="font-bold text-purple-600 text-5xl sm:text-6xl xl:text-8xl text-shadow-glow-red" style={{ filter: 'drop-shadow(0 0 10px rgba(231, 33, 6, 0.5))' }}>+3,000</p>
                        <p className="text-white text-xl sm:text-2xl xl:text-[27px] font-semibold ml-4">smart contracts analyzed.</p>
                    </motion.div>



                </motion.div> 
                <div className="flex flex-1 items-center justify-center">
                    <video
                        autoPlay
                        loop
                        muted 
                        src="/videos/video-5.mp4"
                        className="h-full w-full xl:h-4/4 xl:w-4/4 rounded-xl object-cover"
                    />
                </div>   
            </section>
            
        

    </main>
    
  )
}

export default ReliabilitySection