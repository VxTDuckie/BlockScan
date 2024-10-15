"use client"
import React, { useEffect, useState } from 'react';
import { useScanning, ScanningNotification } from '@/components/index';

// Component for displaying a list of contracts
const ContractList = () => {
    // Dummy contract data for demonstration
    const fakeContract = [
        { logo: '/images/didi-logo.png', name: 'DiDi Coin', company: 'DC', liquidity: '$ 15M', governance: 'Active' },
        { logo: '/images/shiba.webp', name: 'Shiba Inu', company: 'SHIB', liquidity: '$ 4.89M', governance: 'No Governance' },
        { logo: '/images/mog.webp', name: 'Mog Coin', company: 'MOG', liquidity: '$ 7.41M', governance: 'Active' },
        { logo: '/images/nodeai.webp', name: 'NodeAI', company: 'GPU', liquidity: '$ 892K', governance: 'Renounced' },
        { logo: '/images/turbo.webp', name: 'Turbo', company: 'TURBO', liquidity: '$ 982K', governance: 'Renounced' },
        { logo: '/images/coingecko.webp', name: 'Pepe', company: 'PEPE', liquidity: '$ 20.76M', governance: 'Renounced' },
        { logo: '/images/neiro.webp', name: 'Neiro', company: 'NEIRO', liquidity: '$ 30M', governance: 'Renounced' },
        { logo: '/images/trump.webp', name: 'MAGA', company: 'TRUMP', liquidity: '$ 3.23M', governance: 'Renounced' },
    ];

    // Function to generate random numbers for safety scores
    const generateRandomNumbers = () => {
        return fakeContract.map(() => Math.floor(Math.random() * 61) + 40);
    };

    // State to store random numbers for safety scores
    const [randomNumbers, setRandomNumbers] = useState(generateRandomNumbers);

    // Effect to generate new random numbers on component mount
    useEffect(() => {
        setRandomNumbers(generateRandomNumbers());
    }, []);

    // Custom hook for handling scanning functionality
    const {startScanning, isScanning} = useScanning();
    
    // Handler for clicking on a contract row
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        startScanning('');
    }

    return (
        <main className="overflow-x-hidden">
            <section className="bg-white__bg py-8 sm:py-16 md:py-24 ">
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto overflow-x-auto">
                    {/* Table to display contract information */}
                    <table className="w-full border-collapse bg-white rounded-xl shadow-md">
                        <thead>
                            <tr className="text-lg sm:text-xl md:text-2xl font-bold text-primary-red border-b border-gray-200">
                                <th className="p-2 sm:p-4 text-left text-primary-red">TOKEN INFO</th>
                                <th className="p-2 sm:p-4 text-center text-pink-500">LIQUIDITY</th>
                                <th className="p-2 sm:p-4 text-center text-purple-600">GOVERNANCE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map through fake contract data to create table rows */}
                            {fakeContract.map((contract, index) => (
                                <tr key={index} className="border-b last:border-none hover:bg-gray-100">
                                    <td className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-4" onClick={handleClick}>
                                        <div className="flex items-center mb-2 sm:mb-0">
                                            <img src={contract.logo} alt="Token Logo" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full" />
                                            <div className="pl-2 sm:pl-4 flex flex-col">
                                                <p className="text-base sm:text-xl md:text-2xl font-bold">{contract.name}</p>
                                                <p className="text-sm sm:text-base text-gray-500 font-semibold">{contract.company}</p>
                                            </div>
                                        </div>
                                        <p className='text-sm sm:text-base mt-2 sm:mt-0'>Safety Score: <span className='font-bold text-primary-red text-base sm:text-lg md:text-xl pl-1 sm:pl-2'>{randomNumbers[index]}</span></p>
                                    </td>
                                    <td className="text-center p-2 sm:p-4 font-medium text-gray-800 text-sm sm:text-base">{contract.liquidity}</td>
                                    <td className="text-center p-2 sm:p-4 font-medium text-gray-800 text-sm sm:text-base">{contract.governance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Display scanning notification when isScanning is true */}
                {isScanning && <ScanningNotification/>}
            </section>
        </main>
    );
};

export default ContractList;