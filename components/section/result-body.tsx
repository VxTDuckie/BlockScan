import React, { useState } from 'react';
import {Vulnerability, Overview} from '@/components/index';


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
}
interface ResultBodyProps {
  metrics: AnalysisMetrics | null;
  vulns: AnalysisVulns[] | null;
}
//Component for displaying contract safety check results
const ResultBody : React.FC<ResultBodyProps> = ({metrics, vulns}) => {
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
        {isChosen ? <Overview metrics={metrics}/> : <Vulnerability vulnList={vulns}/>} 
      </div>
    </main>
  );
};

export default ResultBody;