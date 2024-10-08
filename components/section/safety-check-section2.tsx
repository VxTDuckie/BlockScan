import React from 'react';

const SafetyCheck2 = () => {
    const fakeResults = [
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
    return (
      <main>
        <div>
          <ul className='space-y-4'>
            {fakeResults.map((result, index) => (
              <li key={index} className='p-4 lg:p-6 rounded-lg bg-white shadow-md'>
                <div className='flex items-center'>
                  <img src={result.status} alt='checking symbol' className={`p-2 rounded-lg mr-4 ${result.bg}`} />
                  <p className='font-bold text-lg lg:text-xl'>{result.check}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
}

export default SafetyCheck2;
