"use client"
import { useState } from 'react';

export default function TokenSafetyCheck() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  // Fake check results
  const fakeResults = [
    { check: 'No vulnerable withdrawal functions found', status: '✅' },
    { check: 'No reentrancy risk found', status: '✅' },
    { check: 'No locks detected', status: '✅' },
    { check: 'Verified source code found', status: '✅' },
    { check: 'No mintable risks found', status: '✅' },
    { check: 'Ownership is renounced', status: '❌' },
    { check: 'No blacklisted functions found', status: '✅' },
    { check: 'No proxy contract detected', status: '✅' },
    { check: 'Liquidity locked', status: '✅' },
    { check: 'Audit report found', status: '❌' },
  ];

  // Handle submit and fake a token check
  const handleCheck = () => {
    setIsChecked(true);
  };

  return (
    <div>
      <h1>Token Safety Checker</h1>
      <input
        type="text"
        placeholder="Enter token address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <button onClick={handleCheck}>Check Token</button>

      {isChecked && (
        <div>
          <h3>Safety Check Results for Token: {tokenAddress}</h3>
          <ul>
            {fakeResults.map((result, index) => (
              <li key={index}>
                {result.check}: {result.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
