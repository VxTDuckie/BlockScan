import React, { useState } from 'react';
import {VulnerabilityList, Overview, DonutChartForSecureScore} from '@/components/index';
import { MoveRight, MoveRightIcon } from 'lucide-react';

interface AnalysisMetrics {
  id: string;
  project_name: string;
  created_at: string;
  total_contracts: number;
  source_lines: number;
  assembly_lines: number;
  scan_duration: number;
  optimization_issues: number;
  informational_issues: number;
  low_issues: number;
  medium_issues: number;
  high_issues: number;
  ercs: string;
}
interface AnalysisVulns {
  vulnerability: string;
  severity: string;
  recommendation: string;
}
interface ResultBodyProps {
  metrics: AnalysisMetrics | null;
  vulns: AnalysisVulns[] | null;
  riskScore: number;
  raw_markdown_content: string;
}
//Component for displaying contract safety check results
const ResultBody : React.FC<ResultBodyProps> = ({metrics, vulns, riskScore, raw_markdown_content}) => {
  // State quản lý tab đang được chọn (Token Detector hoặc General Detector)
  const [isChosen, setIsChosen] = useState(true); 

  return (
    <main>
      {/* Nút chọn giữa hai tab: Token Detector và General Detector */}
      <div className='flex space-x-4 mb-4 justify-center sm:justify-start'>
        <div className=''>
          <button
            onClick={() => setIsChosen(true)}
            className={`px-6 py-3 text-hard-red text-xl font-semibold transition-all duration-300 ease-in-out transform 
              ${isChosen ? 'border-b-4 border-primary-red text-opacity-100 ' : 
              'text-opacity-70 border-b-2 border-transparent hover:border-primary-red hover:text-opacity-100 hover:scale-105'}`}
          >
            <span>Overview</span>
          </button>
          <button
            onClick={() => setIsChosen(false)}
            className={`px-6 py-3 text-hard-red text-xl font-semibold transition-all duration-300 ease-in-out transform 
              ${!isChosen ? 'border-b-4 border-primary-red text-opacity-100' : 
              'text-opacity-70 border-b-2 border-transparent hover:border-primary-red hover:text-opacity-100 hover:scale-105'}`}
          >
            <span>Vulnerabilities</span>
          </button>
        </div>
      </div>
      
      <div>
        {isChosen ? 
        <div className='flex flex-col gap-6'>
          <div>
            <Overview metrics={metrics}/> 
          </div>
          <div className='flex gap-6'>
          <div className='flex-[1] bg-white rounded-xl p-6 shadow-sm '>
            <p className='text-xl font-bold mb-2 bg-gradient-to-r from-primary-red to-pink-600 text-transparent bg-clip-text'>Want to learn more?</p>
            <p className='text-gray-500'>To explore detailed explanations, recommendations, and further insights on how to address the issues found, please refer to our comprehensive documentation.</p>
            <div className='mt-6 bg-gradient-to-r from-primary-red to-pink-600 w-fit p-3 rounded-full gap-2 text-white'>
              <a href='https://github.com/crytic/slither/wiki/Detector-Documentation' target='_blank'  className="inline-flex items-center gap-2 hover:gap-6 duration-300">
              View the full documentation
              <MoveRightIcon/>
              </a>
            </div>
          </div>
          <div className='bg-white rounded-xl p-6 shadow-sm flex flex-[2] items-center'>
            <DonutChartForSecureScore score={riskScore}/>
            <div className='rounded-xl flex flex-col justify-between bg-gray-50 p-4'>
              <div>
                <div className='flex'>
                <p className='text-xl mr-2 mb-2 text-gray-800'>Contract Risk Level:</p>
                <p className='text-xl font-bold'>{riskScore >=80 ? <p className='text-purple-950'>CATASTROPHIC</p> 
                : riskScore >= 60 ? <p className='text-red-800'>SIGNIFICANT</p> 
                : riskScore >= 40 ? <p className='text-primary-red'>HIGH</p> 
                : riskScore >= 20 ? <p className='text-yellow-400'>MODERATE</p> 
                : riskScore >= 5 ? <p className='text-green-500'>LOW</p> 
                : <p className='text-gray-500'>MINIMAL</p>}</p>        
                </div>
                <p className='text-gray-500 mb-6'>
                At BlockScan, the risk score is determined by analyzing the lines of code and applying weights
                to each issue based on their severity level. A lower risk score indicates better security practices. 
                To reduce your risk score, you can review the detailed analysis and apply the suggested fixes provided in the report.
                </p>
              </div>

              <div className='flex justify-end'>
                <button className='mr-0 hover:mr-2 flex items-center bg-gradient-to-r from-primary-red to-pink-500 text-transparent bg-clip-text w-auto rounded-xl hover:text-primary-red duration-300 transition-all' 
                onClick={() => {
                  setIsChosen(false);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}>
                  <p className='mr-2'>View the vulnerabilities</p>
                  <MoveRight/>
                </button> 
              </div>
              
            </div>
          </div>
          </div>

        </div>
        : <VulnerabilityList vulnList={vulns} markdownContent={raw_markdown_content}/>} 
      </div>
    </main>
  );
};

export default ResultBody;