"use client";
import React from 'react';
import {ContractList, SmartScanning} from '@/components/index';



const Page = () => {
  return (
    <main className='bg-black min-h-screen '>
      <SmartScanning/>
      <ContractList/>
    </main>
  );
}

export default Page;
