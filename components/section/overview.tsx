import React from 'react'
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { RadarChart, DonutChart, CopyButton } from '@/components/index'

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

export const Overview = () => {
  const [metrics, setMetrics] = useState<AnalysisMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data, error } = await supabase
          .from('slither_metrics')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch analysis results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (!metrics) {
    return (
      <div className='flex bg-white p-6 rounded-xl shadow-md'>
        <div className="text-gray-500">No metrics data available</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
    <div className='flex justify-between bg-white p-6 gap-6 rounded-xl shadow-md'>
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl gap-2">
            <span>Project ID:</span>
            <div className='gap-1'>
              <span className="font-bold bg-gradient-to-r from-primary-red via-pink-500 to-purple-600 text-transparent bg-clip-text">{metrics.id}</span>
              <span><CopyButton textToCopy={metrics.id}/></span>
            </div>
           
          </div>
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl gap-2">
            <span>Created at:</span>
            <span className="font-bold text-blue-500">{metrics.created_at}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl gap-2">
            <span>Total contract:</span>
            <span className="font-bold text-gray-500">{metrics.total_contracts}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl gap-2">
            <span>Assembly lines:</span>
            <span className="font-bold text-gray-500">{metrics.assembly_lines}</span>
          </div>
    </div>
    <div className='flex justify-between bg-white p-6 gap-6 rounded-xl shadow-md'>
      <div className='flex-[2]'>
        <h3 className="text-xl font-bold mb-6">Contract Metrics</h3>
        <div className="space-y-4">
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
            <span className="font-bold text-yellow-500">{metrics.medium_issues}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span>High Issues</span>
            <span className="font-bold text-red-600">{metrics.high_issues}</span>
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