"use client"
import { useState } from 'react'
import React from 'react'
import { useScanning } from '@/components/feature/useScanning'


const SmartScanning = () => {
  const [inputValue, setInputValue] = useState('');
  const { isScanning, handleKeyPress, startScanning} = useScanning();
  const handleFileUpload = () => {
    startScanning('');
  }


  return (
    <div className='max-w-6xl mx-auto'>
    <div className='flex flex-col lg:flex-row justify-between mb-8'>
      <div>
        <h1 className='text-white text-4xl lg:text-6xl mt-4 lg:mt-8 mb-4 font-bold text-shadow-weak-ass-glow' style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}>
          Smart scanning
        </h1>
        <div className='flex flex-col lg:flex-row text-subtitle__grey font-bold text-sm lg:text-base'>
          <span>Leverage advanced algorithms</span>
          <span className='hidden lg:inline mx-4'>|</span>
          <span>Identify key contract insights</span>
          <span className='hidden lg:inline mx-4'>|</span>
          <span>Optimize processes</span>
        </div>
      </div>
    </div>
    <div className='flex flex-col lg:flex-row items-center gap-4 mb-8 mt-16'>
      <input
        type="text"
        placeholder="Enter contract address"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e, inputValue)}
        className="w-full lg:w-auto flex-grow rounded-xl p-2 pl-4 border-2 border-white shadow-weak-ass-glow bg-black white transition-all duration-300 ease-in-out transform hover:scale-y-110"
      />
      <label className='text-center white rounded-xl p-2 border-2 border-white shadow-weak-ass-glow cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110'>
        Upload
        <input type="file" accept='' className='hidden' onChange={handleFileUpload}/>
      </label>

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
  
  )
}

export default SmartScanning