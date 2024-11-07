import React from 'react';
import  {motion} from "framer-motion"; // Animation library

// Animation configuration for fading up elements
const fadeUp = {
    hidden: {opacity: 0, y: 50},
    reveal: {opacity: 1, y: 0},
}

const ReliabilitySection = () => {
  return (
    <main className='overflow-hidden'>
            {/* Section for media content */}
            <section className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 z-50" >
                <motion.div 
                className="flex flex-col items-center xl:flex-row gap-20 xl:items-start pt-2"
                initial='hidden'
                whileInView='reveal'
                transition={{ staggerChildren: 0.2 }}
                >
                    <motion.div 
                    className="flex-col flex-[1] smp:justify-end xl:justify-center items-center text-center"
                    transition={{duration: 0.5, delay:0.2}}
                    variants={fadeUp}>
                        <p className="font-bold text-primary-red text-5xl sm:text-7xl lg:text-8xl xl:text-7xl 1600:text-8xl text-shadow-glow-red mb-4" style={{ filter: 'drop-shadow(0 0 10px rgba(231, 33, 6, 0.6))' }}>+15,000</p>
                        <p className="text-black text-[18px] xl:text-4xl sm:text-[27px] font-semibold ml-4">daily active users.</p>
                    </motion.div>

                    <motion.div 
                    className="flex-col flex-[1] justify-center smp:justify-end xl:justify-start items-center my-auto  text-center"
                    transition={{duration: 0.5, delay:0.4}}
                    variants={fadeUp}>
                        <p className="font-bold text-pink-500 text-5xl sm:text-7xl lg:text-8xl xl:text-7xl 1600:text-8xl mb-4" style={{ filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.6))' }}>+90</p>
                        <p className="text-black text-[18px] xl:text-4xl sm:text-[27px] font-semibold ml-4">Slither authorized detectors.</p>
                    </motion.div>


                    <motion.div 
                    className="flex-col flex-[1] justify-center smp:justify-end xl:justify-start items-center text-center"
                    transition={{duration: 0.5, delay:0.6}}
                    variants={fadeUp}>
                        <p className="font-bold text-pink-600 text-5xl sm:text-7xl lg:text-8xl xl:text-7xl 1600:text-8xl text-shadow-glow-red mb-4" style={{ filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.5))' }}>+3,000</p>
                        <p className="text-black text-[18px] xl:text-4xl sm:text-[27px] font-semibold ml-4">smart contracts analyzed.</p>
                    </motion.div>



                </motion.div> 
            </section>
            
        

    </main>
    
  )
}

export default ReliabilitySection