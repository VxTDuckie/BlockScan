import React from 'react'
import {CopyButton} from '@/components/index'

// Component for displaying basic token information
const tokenBasicInfo = () => {
    const tokenAddress = '0x576e2bed8f7b46d34016198911cdf9886f78bea7'; // Full address
    const contractCreator = '0xa99c602037f8e85a44bbe88f3c0ee3af60345b9b'; // Full address
    const contractOwner = '0x000000000000000000000000000000000000dead'; // Full address

    const shortenAddress = (address: string) => {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };
    return (

    <div
      className="w-full p-6 mb-7 bg-gradient-to-r from-primary-red via-pink-500 to-purple-600"
      style={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
      }}
    >
      <h2 className="text-white text-2xl font-bold mb-4" style={{ fontFamily: "Outfit" }}>
        Token Liquidity Analysis
      </h2>

      <div
        className="rounded-xl p-6 w-full"
        style={{
          backgroundColor: 'rgba(240, 240, 240, 0.5)',
          borderRadius: '12px',
          flexDirection: 'column',
        }}
      >
        <div className='flex justify-between white text-[18px] mb-2'>
            <p className='text-gray-500'>Token Type</p>
            <p className='font-bold'>ERC20</p>
        </div>
        <div className='flex justify-between white text-[18px]  mb-2'>
            <p className='text-gray-500'>Contract Address</p>
            <p className='font-bold'>{shortenAddress(tokenAddress)}
                <span className='ml-1'><CopyButton textToCopy={tokenAddress} /></span>
            </p>

        </div>
        <div className='flex justify-between white text-[18px] mb-2'>
            <p className='text-gray-500'>Contract Creator</p>
            <p className='font-bold'>{shortenAddress(contractCreator)}
                <span className='ml-1'><CopyButton textToCopy={contractCreator} /></span>
            </p>
            

        </div>
        <div className='flex justify-between  text-[18px] mb-2'>
            <p className='text-gray-500'>Contract Owner</p>
            <p className='font-bold white'>{shortenAddress(contractOwner)}
                <span className='ml-1'><CopyButton textToCopy={contractOwner}/></span>
            </p>

        </div>



        
      </div>
    </div>
  )
}

export default tokenBasicInfo