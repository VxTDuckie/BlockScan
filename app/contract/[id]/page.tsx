"use client";
import React from 'react';
import { SmartScanning, ContractScanResult } from '@/components/index';



const Page = () => {
  return (
    <main className='bg-black min-h-screen '>
      <SmartScanning/>
      <ContractScanResult/>  
    </main>
  );
}

export default Page;
