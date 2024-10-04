"use client"
import React, { useState } from 'react';

const SafetyCheck = () => {
  const [isChosen, setIsChosen] = useState<boolean>(true); // State to switch between sections

  const fakeResultsOne = [
    { check: 'No vulnerable withdrawal functions found', status: '/images/check-2.png', bg: 'bg-primary-red'},
    { check: 'No reentrancy risk found', status: '/images/check-2.png', bg: 'bg-primary-red'},
    { check: 'No locks detected', status: '/images/check-2.png',bg: 'bg-primary-red' },
    { check: 'Verified source code found', status: '/images/check-2.png',bg: 'bg-primary-red' },
    { check: 'No mintable risks found', status: '/images/check-2.png',bg: 'bg-primary-red' },
    { check: 'Ownership is renounced', status: '/images/shield-x-solid-24.png',bg: 'bg-black' },
    { check: 'No blacklisted functions found', status: '/images/check-2.png', bg: 'bg-primary-red'},
    { check: 'No proxy contract detected', status: '/images/check-2.png' ,bg: 'bg-primary-red'},
    { check: 'Liquidity locked', status: '/images/check-2.png', bg: 'bg-primary-red'},
    { check: 'Audit report found', status: '/images/shield-x-solid-24.png', bg: 'bg-black' },
    { check: 'Audit report found', status: '/images/error-solid-24.png', bg: 'bg-black' },
    { check: 'Audit report found', status: '/images/error-alt-solid-24.png', bg: 'bg-black' },
  ];

  const fakeResultsTwo = [
    { check: 'No error found', status: '/images/check-2.png', bg: 'bg-primary-red'},
    { check: 'No reentrancy risk found', status: '/images/check-2.png', bg: 'bg-primary-red'},
    { check: 'No locks detected', status: '/images/check-2.png',bg: 'bg-primary-red' },
    { check: 'Verified source code found', status: '/images/check-2.png',bg: 'bg-primary-red' },
    { check: 'No mintable risks found', status: '/images/check-2.png',bg: 'bg-primary-red' },
    { check: 'Ownership is renounced', status: '/images/shield-x-solid-24.png',bg: 'bg-black' },
    { check: 'No blacklisted functions found', status: '/images/check-2.png', bg: 'bg-primary-red'},
    { check: 'No proxy contract detected', status: '/images/check-2.png' ,bg: 'bg-primary-red'},
    { check: 'Liquidity locked', status: '/images/check-2.png', bg: 'bg-primary-red'},
    { check: 'Audit report found', status: '/images/shield-x-solid-24.png', bg: 'bg-black' },
    { check: 'Audit report found', status: '/images/error-solid-24.png', bg: 'bg-black' },
    { check: 'Audit report found', status: '/images/error-alt-solid-24.png', bg: 'bg-black' },
  ];

  const handleTabClick = (e: boolean) => {
    setIsChosen(e);
  };

  return (
    <main>
      <div className='flex space-x-4 mb-4 bg'>
        <div className=''>
        <button
  onClick={() => handleTabClick(true)}
  className={`px-6 py-3 text-hard-red font-semibold transition-all duration-300 ease-in-out transform 
    ${isChosen ? 'border-b-4 border-primary-red text-opacity-100' : 
    'text-opacity-70 border-b-2 border-transparent hover:border-primary-red hover:text-opacity-100 hover:scale-105'}`}>
  <span>Token Detector</span>
</button>

<button
  onClick={() => handleTabClick(false)}
  className={`px-6 py-3 text-hard-red font-semibold transition-all duration-300 ease-in-out transform 
    ${!isChosen ? 'border-b-4 border-primary-red text-opacity-100' : 
    'text-opacity-70 border-b-2 border-transparent hover:border-primary-red hover:text-opacity-100  hover:scale-105'}`}>
  <span>General Detector</span>
</button>

      </div>
        </div>
        

      <div>
        <ul className='space-y-4'>
          {isChosen
            ? fakeResultsOne.map((result, index) => (
                <li key={index} className='p-4 lg:p-6 rounded-xl bg-white shadow-md'>
                  <div className='flex items-center'>
                    <img
                      src={result.status}
                      alt='checking symbol'
                      className={`p-2 rounded-xl mr-4 ${result.bg}`}
                    />
                    <p className='font-bold text-lg lg:text-xl'>{result.check}</p>
                  </div>
                </li>
              ))
            : fakeResultsTwo.map((result, index) => (
                <li key={index} className='p-4 lg:p-6 rounded-xl bg-white shadow-md'>
                  <div className='flex items-center'>
                    <img
                      src={result.status}
                      alt='checking symbol'
                      className={`p-2 rounded-xl mr-4 ${result.bg}`}
                    />
                    <p className='font-bold text-lg lg:text-xl'>{result.check}</p>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </main>
  );
};

export default SafetyCheck;
