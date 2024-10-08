"use client"
import React, { useEffect, useState } from 'react';
import SmartScanning from './smart-scanning-section';
import { useScanning } from '@/components/index';

const ContractList = () => {
    // Dummy contract data
    const fakeContract = [
        { logo: '/images/didi-logo.png', name: 'DiDi Coin', company: 'DC', liquidity: '$ 15M', governance: 'Active' },
        { logo: '/images/ethereum-logo.png', name: 'Ethereum', company: 'ETH', liquidity: '$ 50M', governance: 'Renounced' },
        { logo: '/images/bitcoin-logo.png', name: 'Binance Coin', company: 'BNB', liquidity: '$ 30M', governance: 'Active' },
        { logo: '/images/solana-logo.png', name: 'Solana', company: 'SOL', liquidity: '$ 20M', governance: 'Renounced' },
        { logo: '/images/didi-logo.png', name: 'DiDi Coin', company: 'DC', liquidity: '$ 15M', governance: 'Active' },
        { logo: '/images/ethereum-logo.png', name: 'Ethereum', company: 'ETH', liquidity: '$ 50M', governance: 'Renounced' },
        { logo: '/images/bitcoin-logo.png', name: 'Binance Coin', company: 'BNB', liquidity: '$ 30M', governance: 'Active' },
        { logo: '/images/solana-logo.png', name: 'Solana', company: 'SOL', liquidity: '$ 20M', governance: 'Renounced' },
    ];

    // Generate random numbers for each contract
    const generateRandomNumbers = () => {
        return fakeContract.map(() => Math.floor(Math.random() * 61) + 40); // Random number between 40 and 100
    };

    const [randomNumbers, setRandomNumbers] = useState(generateRandomNumbers);

    useEffect(() => {
        setRandomNumbers(generateRandomNumbers()); // Set random numbers when component mounts
    }, []); // Empty dependency array ensures it runs only once

    const {startScanning, isScanning} = useScanning();
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        startScanning('');
    }

    return (
        <main>
            <SmartScanning />
            <section className="h-[auto] bg-white__bg py-24">
                <table className="w-[61%] mx-[auto] border-collapse bg-white rounded-[15px] shadow-md">
                    <thead>
                        <tr className="text-[26px] font-bold text-primary-red border-b border-gray-200">
                            <th className="p-4 text-left" style={{ width: '60%' }}>TOKEN INFO</th>
                            <th className="p-4 text-center" style={{ width: '20%' }}>LIQUIDITY</th>
                            <th className="p-4 text-center" style={{ width: '20%' }}>GOVERNANCE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fakeContract.map((contract, index) => (
                             <tr key={index} className="border-b last:border-none hover:bg-gray-100">
                                <td className="flex items-center justify-between p-4" onClick={handleClick}>
                                    <div className="flex items-center" >
                                        <img src={contract.logo} alt="Token Logo" className="w-12 h-12 rounded-full" />
                                        <div className="pl-4 flex flex-col">
                                            <p className="text-2xl font-bold">{contract.name}</p>
                                            <p className="text-gray-500 font-semibold">{contract.company}</p>
                                        </div>
                                    </div>
                                
                                <p className='text-[16px]'>Safety Score: <span className='font-bold text-primary-red text-[20px] pl-2'>{randomNumbers[index]}</span></p> {/* Use the pre-generated random number here */}
                                </td>
                                <td className="text-center p-4 font-medium text-gray-800">{contract.liquidity}</td>
                                <td className="text-center p-4 font-medium text-gray-800">{contract.governance}</td>
                            </tr>
                    ))}
                    </tbody>
                </table>
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
            </section>
        </main>
    );
};


export default ContractList;