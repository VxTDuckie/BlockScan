import React from 'react'

const SmartScanning = () => {
  return (
    <section className='max-w-6xl mx-auto'>
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
        placeholder="Search a contract"
        className="w-full lg:w-auto flex-grow rounded p-2 border-2 border-white shadow-weak-ass-glow bg-black white"
      />
      <label className='text-center white rounded p-2 border-2 border-white shadow-weak-ass-glow cursor-pointer'>
        Upload
        <input type="file" accept='.sol' className='hidden' />
      </label>
    </div>
  </section>
  )
}

export default SmartScanning