import React from 'react'

const SafetyCheck = () => {
    const fakeResults = [
        { check: 'No vulnerable withdrawal functions found', status: '/images/check-2.png', bg: 'bg-primary-red'},
        { check: 'No reentrancy risk found', status: '/images/check-2.png', bg: 'bg-primary-red'},
        { check: 'No locks detected', status: '/images/check-2.png',bg: 'bg-primary-red' },
        { check: 'Verified source code found', status: '/images/check-2.png',bg: 'bg-primary-red' },
        { check: 'No mintable risks found', status: '/images/check-2.png',bg: 'bg-primary-red' },
        { check: 'Ownership is renounced', status: '/images/cross-2.png',bg: 'bg-black' },
        { check: 'No blacklisted functions found', status: '/images/check-2.png', bg: 'bg-primary-red'},
        { check: 'No proxy contract detected', status: '/images/check-2.png' ,bg: 'bg-primary-red'},
        { check: 'Liquidity locked', status: '/images/check-2.png', bg: 'bg-primary-red'},
        { check: 'Audit report found', status: '/images/cross-2.png', bg: 'bg-black' },
      ];
    return (

    <main>
              <div>
              <ul className='space-y-4'>
                {fakeResults.map((result, index) => (
                  <li key={index} className='p-4 lg:p-6 rounded-lg bg-white border border-slate-200'>
                    <div className='flex items-center'>
                      <img src={result.status} alt='checking symbol' className={`p-2 rounded-lg mr-4 ${result.bg}`} />
                      <p className='font-bold text-lg lg:text-xl'>{result.check}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
    </main>
    )
}

export default SafetyCheck