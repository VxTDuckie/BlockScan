import React from 'react'
import {Facebook, Github} from 'lucide-react'
const MeetTheTeam = () => {
  return (
    <main className='bg-black min-h-[70vh] text-white'>
    <div className='text-center py-14'>
        <h2 className='white font-bold text-4xl'>Meet the <span className='text-primary-red'>Team</span></h2>
        <p className='text-2xl'>We're always willing to listen to everyone.</p>
    </div>
    <div className='max-w-7xl py-20 flex justify-between mx-auto'>
        <div className='flex justify-center text-center gap-12 items-start'>
            <img src='/images/member_1.jpg' className='h-[200px] w-[200px] rounded-full mb-12 shadow-weak-ass-glow'/>
            <div className='text-left'>
                <p className='text-2xl font-semibold'>Nguyen Thien Phuoc</p>
                <p className='text-xl text-subtitle__gray pb-4'>Founder & CEO</p>
                <div className='flex gap-4 h-5'>
                <a href='https://www.facebook.com/profile.php?id=61566144360040' target='_blank'>
                <Facebook className='text-subtitle__gray w-7 h-7'/>
                </a>
                <a href='https://github.com/Levironexe' target='_blank'>
                <Github className='text-subtitle__gray w-7 h-7'/>
                </a>
                </div>
                
            </div>
           
        </div>
        <div className='flex justify-center text-center gap-12 items-start'>
            <img src='/images/member_2.jpg' className='h-[200px] w-[200px] rounded-full mb-12 shadow-weak-ass-glow'/>
            <div className='text-left'>
                <p className='text-2xl font-semibold'>Viet Nguyen</p>
                <p className='text-xl text-subtitle__gray pb-4'>Co-Founder</p>
                <div className='flex gap-4 h-5'>
                <a href='https://www.facebook.com/vxtduckie' target='_blank'>
                <Facebook className='text-subtitle__gray w-7 h-7'/>
                </a>
                <a href='https://github.com/VxTDuckie' target='_blank'>
                <Github className='text-subtitle__gray w-7 h-7'/>
                </a>
                </div>
                
            </div>
           
        </div>

    </div>
    </main>
  )
}

export default MeetTheTeam