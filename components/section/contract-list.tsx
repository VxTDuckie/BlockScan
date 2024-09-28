"use client"
import React, { useEffect, useState } from 'react';
import SmartScanning from './smart-scanning-section';
import Link from 'next/link';

const ContractList = () => {
    // Dummy contract data
    const fakeContract = [
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

    return (
        <main>
            <SmartScanning />
            <section className="h-[800px] bg-white__bg py-24">
                <table className="w-[70%] mx-auto border-collapse bg-white rounded-[15px] shadow-md">
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
                                <td className="flex items-center justify-between p-4">
                                
                                <Link href='/contract/didicoin'>
                                    <div className="flex items-center">
                                        <img src={contract.logo} alt="Token Logo" className="w-24 h-24 rounded-full" />
                                        <div className="pl-4 flex flex-col">


                                            <p className="text-2xl font-bold">{contract.name}</p>
                                        
                                            <p className="text-gray-500 font-semibold">{contract.company}</p>

                                        </div>
                                    </div>
                                </Link>
                                <p className='text-[16px]'>Safety Score: <span className='font-bold text-primary-red text-[20px] pl-2'>{randomNumbers[index]}</span></p> {/* Use the pre-generated random number here */}
                                </td>
                                <td className="text-center p-4 font-medium text-gray-800">{contract.liquidity}</td>
                                <td className="text-center p-4 font-medium text-gray-800">{contract.governance}</td>
                            </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
};


export default ContractList;
