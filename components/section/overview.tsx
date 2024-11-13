import React from 'react'
import { DonutChart, CopyButton } from '@/components/index'

interface AnalysisMetrics {
  id: string;
  created_at: string;
  total_contracts: number;
  source_lines: number;
  assembly_lines: number;
  optimization_issues: number;
  informational_issues: number;
  low_issues: number;
  medium_issues: number;
  high_issues: number;
  ercs: string;
}
interface OverviewProps {
  metrics: AnalysisMetrics | null;
}

export const Overview: React.FC<OverviewProps>= ({metrics}) => {


  if (!metrics) {
    return (
      <div className='flex bg-white p-6 rounded-xl shadow-sm'>
        <div className="text-gray-500">No metrics data available</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6'>  
      <div className='flex flex-col bg-white p-6 rounded-xl shadow-sm gap-6'>
        {/* Header */}
        <h3 className="text-xl font-bold text-gray-800">Contract Overview</h3>

        {/* Metrics Container */}
        <div className='flex justify-between gap-6'>
          {/* Project ID */}
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl gap-2 text-gray-800">
            <span>Project ID:</span>
            <div className='flex items-center gap-1'>
              <span className="font-bold bg-gradient-to-r from-primary-red to-pink-600 text-transparent bg-clip-text">
                {metrics.id}
              </span>
              <CopyButton textToCopy={metrics.id}/>
            </div>
          </div>

          {/* Created At */}
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl gap-2 text-gray-800">
            <span>Created at:</span>
            <span className="font-bold bg-gradient-to-r from-primary-red to-pink-600 text-transparent bg-clip-text">
              {metrics.created_at}
            </span>
          </div>

          {/* Total Contracts */}
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl gap-2 text-gray-800">
            <span>Total contract:</span>
            <span className="font-bold text-gray-500">
              {metrics.total_contracts}
            </span>
          </div>

          {/* Assembly Lines */}
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl gap-2 text-gray-800">
            <span>Assembly lines:</span>
            <span className="font-bold text-gray-500">
              {metrics.assembly_lines}
            </span>
          </div>
        </div>
      </div>
   
    <div className='flex justify-between bg-white p-6 gap-6 rounded-xl shadow-sm'>
      <div className='flex-[2]'>
        <h3 className="text-xl font-bold mb-6 text-gray-800">Contract vulnerabilities</h3>
        <div className="space-y-4 text-gray-800">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span>Optimization Issues</span>
            <span className="font-bold text-blue-500">{metrics.optimization_issues}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span>Informational Issues</span>
            <span className="font-bold text-gray-500">{metrics.informational_issues}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span>Low Issues</span>
            <span className="font-bold text-green-500">{metrics.low_issues}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span>Medium Issues</span>
            <span className="font-bold text-yellow-400">{metrics.medium_issues}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span>High Issues</span>
            <span className="font-bold text-red-500">{metrics.high_issues}</span>
          </div>
        </div>
      </div>
      <div className='flex-[3]'>
        <DonutChart Informational={metrics.informational_issues}
        Optimization={metrics.optimization_issues}
        Low={metrics.low_issues}
        Medium={metrics.medium_issues}
        High={metrics.high_issues}/>
      </div>
    </div>
    </div>  
  );
};