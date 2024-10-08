"use client";

import React, { useState } from 'react';
import CopyButton from '@/components/button/CopyButton'; // Đảm bảo đường dẫn đúng
import CustomButton from '../dynamicEffect/CustomButton';
import RadarChart from '@/components/chart/RadarChart';
import DonutChart from '@/components/chart/DonutChart';
import { SafetyCheck, SafetyCheck2 } from '@/components/index';
import { TabComponent } from '@/components/index';

const ContractScanResult = () => {
  const [activeTab, setActiveTab] = useState('Token Detector');
  const fullAddress = '0x576e2bed8f7b46d34016198911cdf9886f78bea7'; // Địa chỉ đầy đủ

  // Hàm để rút gọn địa chỉ
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleRedirectToPdf = () => {
    const pdfUrl = 'https://block-scan-woad.vercel.app/contract/scanresult';
    window.open(pdfUrl, '_blank');
  };

  const radarLabels = ['Contract', 'Social', 'Holder', 'Liquidity', 'Governance'];
  const radarScores = [90, 80, 70, 85, 75];

  const renderContent = () => {
    if (activeTab === 'Token Detector') {
      return (
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='flex-[5] lg:w-1/3'>
            <SafetyCheck />
          </div>
          <div className='flex-[4] lg:w-1/3'>
            <RadarChart labels={radarLabels} scores={radarScores} />
            <DonutChart />
          </div>
        </div>
      );
    } else if (activeTab === 'General Detector') {
      return (
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='flex-[5] lg:w-1/3'>
            <SafetyCheck2 />
          </div>
          <div className='flex-[4] lg:w-1/3'>
            <RadarChart labels={radarLabels} scores={radarScores} />
            <DonutChart />
          </div>
        </div>
      );
    }
  };

  return (
    <section className='bg-white__bg pb-20'>
      <div className='max-w-6xl mx-auto lg:py-8'>
        <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8'>
          <div className="flex items-center flex-grow">
            <img src="/images/didi-logo.png" alt="coin logo" width={96} height={96} className="mr-4" />
            <div>
              <div className="flex items-baseline gap-1 pb-1">
                <h2 className="font-bold text-2xl text-primary-red">DiDi Coin</h2>
                <span className="font-normal text-xl text-gray-500">DC</span>
              </div>
              <div className="flex items-center gap-1">
                <p className="font-normal text-sm text-gray-500 break-all underline">
                  {shortenAddress(fullAddress)}
                </p>
                <CopyButton textToCopy={fullAddress} />
              </div>

              {/* Thêm dòng Release Date và Project Age */}
              <div className="flex items-center text-gray-500 text-sm mt-2">
                <p>Deployed – Wed, 2 Oct 2024 • Project age 6h</p> {/* Dòng này tựa như hình bạn đã đưa */}
              </div>
            </div>
          </div>

          {/* Điều chỉnh phân bố các ô */}
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-4">
              <p className="border-2 p-3 rounded-lg bg-white text-black font-bold text-center">
                Medium Risk: <span style={{ color: '#FF9D00' }}>3</span> {/* Màu vàng */}
              </p>

              <p className="border-2 p-3 rounded-lg bg-white text-black font-bold text-center">
                High Risk: <span style={{ color: '#FF0000' }}>2</span> {/* Màu đỏ */}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="border-2 p-3 rounded-lg bg-red-600 text-white font-bold text-center">
                Safety score: 93/100 {/* Màu nền đỏ và chữ trắng */}
              </p>

              <p className="border-2 p-3 rounded-lg bg-white text-black font-bold text-center">
                Attention Required: <span style={{ color: '#3aff00' }}>8</span> {/* Màu xanh */}
              </p>
            </div>
          </div>

          <CustomButton
            icon={<img src='/images/download-2.png' alt='icon' className='w-5 h-5' />}
            title="Export"
            containerStyles="bg-primary-red text-white rounded-full px-4 py-2 lg:py-3 shadow-glow-red"
            handleClick={handleRedirectToPdf}
          />
        </div>

        <hr className='my-8 border-slate-200' />

        <TabComponent onTabChange={setActiveTab} />
        <br />
        {renderContent()}
      </div>
    </section>
  );
};

export default ContractScanResult;
