import React, { useState, useEffect } from 'react';
import { RiliabilitySection } from '..';

const OnScrollSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const firstTransitionPoint = windowHeight * 2;
  const secondTransitionPoint = windowHeight * 3;
  const thirdTransitionPoint = windowHeight * 4;

  return (
    <main>
    <div className=' text-center bg-gradient-to-t from-white to-black pt-[300px]'>
      <h2 className='text-4xl font-semibold mb-4'>Empowering <span className='text-primary-red underline'>Smart Contract</span> with Cutting-edge Features</h2>
      <p className='text-subtitle__gray max-w-2xl mx-auto'>Our advanced scanning platform integrates multiple
         security frameworks to detect vulnerabilities and common attack vectors in Smart Contracts,
          safeguarding projects across the entire web3 ecosystem.</p>
      </div>
    <div className="bg-white">
      
      <section className='relative h-[400vh] max-w-8xl mx-12'>
        {/* Sticky container for images */}
        <div className='sticky top-0 z-30'>
          <div className='grid grid-cols-4 gap-10 items-center p-12 min-h-screen'>
            <div className='col-span-3'>
              {scrollY < firstTransitionPoint && (
                <img src='/images/code_example.png' className='rounded-xl h-1/2 w-auto shadow-glow-purple animation-block-2'/>
              )}
              {(scrollY > firstTransitionPoint && scrollY < secondTransitionPoint) && (
                <div className='flex gap-6 items-center py-auto'>
                  <RiliabilitySection/>
                </div>
              )}
              {(scrollY > secondTransitionPoint && scrollY < thirdTransitionPoint) && (
                <img src='/images/pages_example.png' className='rounded-xl h-1/2 w-auto'
                />
              )} 
              {(scrollY > thirdTransitionPoint) && (
              <img src='/images/spon_example.png' className='rounded-xl h-1/2 w-auto'
              />
              )}
            </div>
          </div>
        </div>
  
        {/* Non-sticky text sections */}
        <div className='absolute top-0 right-0 w-1/4 z-50'>
          <div className='min-h-screen flex items-center'>
            <div className='relative animation-block'>
              <h2 className='font-bold text-3xl mb-4'>
                What are smart contracts?
              </h2>
              <p className='text-xl'>A smart contract is a self-executing program 
                on a blockchain that automatically enforces agreement terms 
                between parties. It runs exactly as programmed without human intervention, 
                eliminating the need for intermediaries.</p>
            </div>
          </div>
          <div className='min-h-screen flex items-center'>
            <div className='animation-block'>
            <h2 className='font-bold text-3xl mb-4'>
            Secure and Reliable Blockchain Solution
            </h2>
              <p className='text-xl'>
                Get the lowest fees, fastest transactions, powerful APIs, and more
              </p>
            </div>
          </div>  
          <div className='min-h-screen flex items-center'>
            <div className='animation-block'>
              <h2 className='font-bold text-3xl mb-4'>
                BlockScan modern analyzing tool
              </h2>
              <p className='text-xl'>
                You can easily mitigate the risks by auditing your Smart Contract with Block Scan, 
                a tool that scans your code for vulnerabilities and common attack vectors. 
                The audit process evaluates contract security and identifies potential bugs, helping protect against costly exploits.
              </p>
            </div>
          </div>

          <div className='min-h-screen flex items-center'>
            <div className='animation-block'>
              <h2 className='font-bold text-3xl mb-4'>
                Our Contributors
              </h2>
              <p className='text-xl'>
                A collaboration between Slither&apos;s security tools, 
                Swinburne University&apos;s research, <span className='font-semibold mr-1'>Mr. Hieu PC - Cybersecurity specialist</span> 
                and <span className='font-semibold'> BlockScan&apos;s audit experts</span>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </main>
  );
};


export default OnScrollSection;