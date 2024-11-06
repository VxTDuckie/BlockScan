import React from 'react';
import  {motion} from "framer-motion"; // Animation library

// Animation configuration for fading up elements
const fadeUp = {
    hidden: {opacity: 0, y: 50},
    reveal: {opacity: 1, y: 0},
}

const OurContributors = () => {
  return (
    <main className='overflow-hidden'>
            <section className="max-w-full mx-auto flex flex-col smp:flex-row gap-12  px-4 sm:px-6 lg:px-8 z-50" >
                <motion.div 
                className="flex gap-20 justify-center items-start xl:mb-0"
                initial='hidden'
                whileInView='reveal'
                transition={{ staggerChildren: 0.2 }}
                >

                    <motion.div 
                    className="flex-col flex-[1] smp:justify-end xl:justify-start items-center pb-4 xl:pb-6 text-center"
                    transition={{duration: 0.5, delay:0.2}}
                    variants={fadeUp}>
                        <img src='/images/slither.png'/>
                    </motion.div>

                    <motion.div 
                    className="flex-col flex-[1] justify-center smp:justify-end xl:justify-start items-center my-auto pb-4 xl:pb-6 text-center"
                    transition={{duration: 0.5, delay:0.4}}
                    variants={fadeUp}>
                        <img src='/images/swin_logo.png'/>
                    </motion.div>


                    <motion.div 
                    className="flex-col flex-[1] justify-center smp:justify-end xl:justify-start items-center pb-4 xl:pb-6 text-center"
                    transition={{duration: 0.5, delay:0.6}}
                    variants={fadeUp}>
                        <img src='/images/hieu_pc.png'/>
                    </motion.div>
                    <motion.div 
                    className="flex-col flex-[1] justify-center smp:justify-end xl:justify-start items-center pb-4 xl:pb-6 text-center"
                    transition={{duration: 0.5, delay:0.6}}
                    variants={fadeUp}>
                        <img src='/images/blockscan.png'/>
                    </motion.div>



                </motion.div> 
            </section>
            
        

    </main>
    
  )
}

export default OurContributors