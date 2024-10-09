"use client"
import { useState } from 'react'
import React from 'react'
import { useScanning, ScanningNotification } from '@/components/index'


const SmartScanning = () => {
  const [inputValue, setInputValue] = useState('');
  const { isScanning, handleKeyPress, startScanning } = useScanning();
  const handleFileUpload = () => {
    startScanning('');
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col mb-8'>
        <div>
          <h1 className='text-white text-3xl sm:text-4xl lg:text-6xl mt-4 lg:mt-8 mb-4 font-bold text-shadow-weak-ass-glow' style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}>
            Smart scanning
          </h1>
          <div className='flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-subtitle__grey font-bold text-sm sm:text-base'>
            <span>Leverage advanced algorithms</span>
            <span className='hidden sm:inline'>|</span>
            <span>Identify key contract insights</span>
            <span className='hidden sm:inline'>|</span>
            <span>Optimize processes</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row items-center gap-4 mb-8 mt-8 sm:mt-16 sm:text-center '>
        <input
          type="text"
          placeholder="Enter contract address"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, inputValue)}
          className="w-full sm:flex-grow rounded-xl p-2 pl-4 border-2 border-white shadow-weak-ass-glow bg-black text-white transition-all duration-300 ease-in-out transform hover:scale-y-105 sm:hover:scale-y-110"
        />
        <label className='w-full sm:w-auto text-center text-white rounded-xl p-2 border-2 border-white shadow-weak-ass-glow cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 sm:hover:scale-110'>
          Upload
          <input type="file" accept='' className='hidden' onChange={handleFileUpload}/>
        </label>
      </div>
      {isScanning && <ScanningNotification />}
    </div>
  )
}

export default SmartScanning