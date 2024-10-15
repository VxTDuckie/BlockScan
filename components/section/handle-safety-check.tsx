import React from 'react'
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
interface HandleSafetyCheckProps {
  isTokenDetector: boolean; // Boolean prop to indicate if the Token Detector is active
}

//Component that is passed boolean argument to display safety check results.
const HandleSafetyCheck : React.FC<HandleSafetyCheckProps> = ({ isTokenDetector }) => {
  // State to store the indexes of expanded sections for Token Detector
  const [openIndexesToken, setOpenIndexesToken] = useState<number[]>([]);

  // State to store the indexes of expanded sections for General Detector
  const [openIndexesGeneral, setOpenIndexesGeneral] = useState<number[]>([]);

  // Mock data for Token Detector tab, simulating various checks and their statuses
  const fakeResultsOne = [
      { check: 'Inaccurate Supply', status: '/images/shield-x-solid-24.png', bg: 'bg-black', risk: 'high' },
      { check: 'Dump Risk', status: '/images/error-solid-24.png', bg: 'bg-black', risk: 'medium' },
      { check: 'Whitelisting', status: '/images/error-alt-solid-24.png', bg: 'bg-black', risk: 'attention' },
      { check: 'No vulnerable withdrawal functions found', status: '/images/check-2.png', bg: 'bg-primary-red' },
      { check: 'No reentrancy risk found', status: '/images/check-2.png', bg: 'bg-primary-red' },
      { check: 'No locks detected', status: '/images/check-2.png', bg: 'bg-primary-red' },
      { check: 'Verified source code found', status: '/images/check-2.png', bg: 'bg-primary-red' },
      { check: 'No mintable risks found', status: '/images/check-2.png', bg: 'bg-primary-red' },
      { check: 'No blacklisted functions found', status: '/images/check-2.png', bg: 'bg-primary-red' },
      { check: 'No proxy contract detected', status: '/images/check-2.png', bg: 'bg-primary-red' },
      { check: 'Liquidity locked', status: '/images/check-2.png', bg: 'bg-primary-red' },
  ];

// Dữ liệu giả cho tab General Detector
const fakeResultsTwo = [
  { check: 'Inaccurate Supply', status: '/images/shield-x-solid-24.png', bg: 'bg-black', risk: 'high' },
  { check: 'Dump Risk', status: '/images/error-solid-24.png', bg: 'bg-black', risk: 'medium' },
  { check: 'Incorrect Solidity Version', status: '/images/error-alt-solid-24.png', bg: 'bg-black', risk: 'attention' },
  { check: 'No error found', status: '/images/check-2.png', bg: 'bg-primary-red' },
  { check: 'No reentrancy risk found', status: '/images/check-2.png', bg: 'bg-primary-red' },
  { check: 'No locks detected', status: '/images/check-2.png', bg: 'bg-primary-red' },
  { check: 'Verified source code found', status: '/images/check-2.png', bg: 'bg-primary-red' },
  { check: 'No mintable risks found', status: '/images/check-2.png', bg: 'bg-primary-red' },
  { check: 'No blacklisted functions found', status: '/images/check-2.png', bg: 'bg-primary-red' },
  { check: 'No proxy contract detected', status: '/images/check-2.png', bg: 'bg-primary-red' },
  { check: 'Liquidity locked', status: '/images/check-2.png', bg: 'bg-primary-red' },
];

// Hàm mở rộng cho Token Detector
const toggleExpandToken = (index: number) => {
  if (openIndexesToken.includes(index)) {
    setOpenIndexesToken(openIndexesToken.filter(i => i !== index));
  } else {
    setOpenIndexesToken([...openIndexesToken, index]);
  }
};

// Hàm mở rộng cho General Detector
const toggleExpandGeneral = (index: number) => {
  if (openIndexesGeneral.includes(index)) {
    setOpenIndexesGeneral(openIndexesGeneral.filter(i => i !== index));
  } else {
    setOpenIndexesGeneral([...openIndexesGeneral, index]);
  }
};

// Hàm render chi tiết riêng cho Token Detector
const renderDetailsToken = (risk: string) => {
  switch (risk) {
    case 'high':
      return (
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-red-600 font-bold">Token Detector - High Risk:</p>
          <p className="text-red-600">Declared total supply is lesser than the sum of actual circulating tokens.</p>
        </div>
      );
    case 'medium':
      return (
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-yellow-500 font-bold">Token Detector - Medium Risk:</p>
          <p className="text-yellow-500">A private wallet owns a significant percentage of this token&rsquo;s total supply.</p>
        </div>
      );
    case 'attention':
      return (
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-green-600 font-bold">Token Detector - Attention Required:</p>
          <p className="text-green-600">The issue is not critical.</p>
        </div>
      );
    default:
      return null;
  }
};

// Hàm render chi tiết riêng cho General Detector
const renderDetailsGeneral = (risk: string) => {
  switch (risk) {
    case 'high':
      return (
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-red-600 font-bold">General Detector - High Risk:</p>
          <p className="text-red-600">Declared total supply does not match the actual token supply.</p>
        </div>
      );
    case 'medium':
      return (
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-yellow-500 font-bold">General Detector - Medium Risk:</p>
          <p className="text-yellow-500">A large wallet holds a significant share of the token.</p>
        </div>
      );
    case 'attention':
      return (
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-green-600 font-bold">General Detector - Attention Required:</p>
          <p className="text-green-600">This contract uses an unconventional or very old version of Solidity.</p>
        </div>
      );
    default:
      return null;
  }
};

  return (
    <ul className='space-y-4'>
          {isTokenDetector
            ? fakeResultsOne.map((result, index) => (
                <li key={index} className='p-4 lg:p-6 rounded-xl bg-white shadow-md'>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      <img
                        src={result.status}
                        alt='checking symbol'
                        className={`p-2 rounded-xl mr-4 ${result.bg}`}
                      />
                      <p className='font-bold text-lg lg:text-xl text-black'>{result.check}</p>
                    </div>
                    {result.risk && (
                      <button onClick={() => toggleExpandToken(index)}>
                          <ChevronDown className={`transition-transform duration-500 h-6 w-6 text-primary-red ${openIndexesToken.includes(index) ? 'rotate-180' : 'rotate-360'}`} />                       
                      </button>
                    )}
                  </div>

                  {/* Advanced View 1 nằm ngoài khung xám */}
                  {openIndexesToken.includes(index) && (
                    <>
                      <div className="mt-2">
                        <p className="text-black font-bold">Advanced View 1:</p>
                        <p className="text-gray-600 mb-4">
                          {result.risk === 'high'
                            ? 'Review the security protocols immediately to mitigate risks.'
                            : result.risk === 'medium'
                            ? 'Mitigation measures should be taken to address this risk soon.'
                            : 'Attention is needed, but this issue is not critical.'}
                        </p>
                      </div>

                      {/* Chi tiết mở rộng bên trong khung xám */}
                      <div className="p-4 bg-gray-100 rounded-2xl">
                        {renderDetailsToken(result.risk!)}
                      </div>

                      {/* Advanced View 2 nằm ngoài khung xám */}
                      <div className="mt-4">
                        <p className="text-black font-bold">Advanced View 2:</p>
                        <p className="text-gray-600 mb-4">
                          This is additional information regarding the issue.
                        </p>
                      </div>
                    </>
                  )}
                </li>
              ))
            : fakeResultsTwo.map((result, index) => (
                <li key={index} className='p-4 lg:p-6 rounded-xl bg-white shadow-md'>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      <img
                        src={result.status}
                        alt='checking symbol'
                        className={`p-2 rounded-xl mr-4 ${result.bg}`}
                      />
                      <p className='font-bold text-lg lg:text-xl'>{result.check}</p>
                    </div>
                    {result.risk && (
                      <button onClick={() => toggleExpandGeneral(index)}>
                          <ChevronDown className={`transition-transform duration-500 h-6 w-6 text-primary-red ${openIndexesGeneral.includes(index) ? 'rotate-180' : 'rotate-360'}`} />
                       
                      </button>
                    )}
                  </div>

                  {/* Advanced View 1 nằm ngoài khung xám */}
                  {openIndexesGeneral.includes(index) && (
                    <>
                      <div className="mt-2">
                        <p className="text-black font-bold">Advanced View 1:</p>
                        <p className="text-gray-600 mb-4">
                          {result.risk === 'high'
                            ? 'Review the security protocols immediately to mitigate risks.'
                            : result.risk === 'medium'
                            ? 'Mitigation measures should be taken to address this risk soon.'
                            : 'Attention is needed, but this issue is not critical.'}
                        </p>
                      </div>

                      {/* Chi tiết mở rộng bên trong khung xám */}
                      <div className="p-4 bg-gray-100 rounded-2xl">
                        {renderDetailsGeneral(result.risk!)}
                      </div>

                      {/* Advanced View 2 nằm ngoài khung xám */}
                      <div className="mt-4">
                        <p className="text-black font-bold">Advanced View 2:</p>
                        <p className="text-gray-600 mb-4">
                          This is additional information regarding the issue.
                        </p>
                      </div>
                    </>
                  )}
                </li>
              ))}
        </ul>
  )
}

export default HandleSafetyCheck