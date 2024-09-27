import React from 'react';
import CustomButton from '../dynamicEffect/CustomButton';
import RadarChart from '@/components/chart/RadarChart';
import DonutChart from '@/components/chart/DonutChart'
import { SafetyCheck } from '@/components/index';
const ContractScanResult = () => {
  const handleRedirectToPdf = () => {
    // Replace the URL below with the actual URL of your PDF
    const pdfUrl = 'https://block-scan-woad.vercel.app/contract/scanresult';
    // Open the PDF in a new tab
    window.open(pdfUrl, '_blank');
  };

    const radarLabels = ['Contract', 'Social', 'Holder', 'Liquidity', 'Governance'];
    const radarScores = [90, 80, 70, 85, 75]; 
    return (
    <section className='bg-white__bg'>
        <div className='max-w-6xl mx-auto lg:py-8'>
          <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8'>
          <div className="flex items-center flex-grow">
              <img src="/images/ddcoin.png" alt="coin logo" width={96} height={96} className="mr-4" />
              <div>
                <div className="flex items-baseline gap-3 pb-2">
                  <h2 className="font-bold text-2xl text-primary-red">DiDi Coin</h2>
                  <span className="font-normal text-xl text-gray-500">DC</span>
                </div>
                <p className="font-normal text-xs text-gray-500 break-all">
                  0x576e2bed8f7b46d34016198911cdf9886f78bea7
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="border-2 p-3 rounded-lg bg-white text-primary-red font-bold text-center">
                Safety score: 93/100
              </p>
              <p className="border-2 p-3 rounded-lg bg-primary-red text-white font-bold text-center">
                Attention required: 1
              </p>
            </div>
            <CustomButton
              icon={<img src='/images/download-2.png' alt='icon' className='w-5 h-5' />}
              title="Export"
              containerStyles="bg-primary-red text-white rounded-full px-4 py-2 lg:py-3 shadow-glow-red"
              handleClick={handleRedirectToPdf}
            />
          </div>
          
          <hr className='my-8 border-slate-200' />
          
          <div className='flex flex-col lg:flex-row gap-8'>
            <SafetyCheck/> 
            <div className='flex-[4] lg:w-1/3'>
              <RadarChart labels={radarLabels} scores={radarScores} /> {/* Passing the dynamic data */}
              <DonutChart/>
              <p className='text-center lg:text-left'>Additional information or charts can go here</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default ContractScanResult