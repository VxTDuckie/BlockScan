import React, { useState, useEffect } from 'react';
import { CustomButton, ResultBody } from '@/components/index';
import { createClient } from '@supabase/supabase-js';

// Types and Interfaces
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

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

// CircularProgress Component
const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 48,
  strokeWidth = 4,
  primaryColor = '#4F46E5',
  secondaryColor = '#E5E7EB'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={secondaryColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
          style={{ strokeLinecap: 'round' }}
        />
      </svg>
    </div>
  );
};

// Utility functions
const calculateSafetyScore = (metrics: AnalysisMetrics): number => {
  if (!metrics) return 0;
  
  const maxScore = 100;
  const deductions = {
    high: 6,
    medium: 2,
    low: 1
  };

  const totalDeduction = 
    (metrics.high_issues * deductions.high) +
    (metrics.medium_issues * deductions.medium) +
    (metrics.low_issues * deductions.low);

  return Math.max(0, Math.min(100, maxScore - totalDeduction));
};

// Main Component
const ContractScanResult: React.FC = () => {
  const [metrics, setMetrics] = useState<AnalysisMetrics | null>(null);
  const [vulns, setVulns] = useState<AnalysisVulns[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Fetch metrics
        const { data: metricsData, error: metricsError } = await supabase
          .from('slither_metrics')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (metricsError) throw metricsError;
        if (!metricsData) throw new Error('No metrics data found');

        if (isMounted) {
          setMetrics(metricsData);

          // Fetch vulnerabilities
          const { data: vulnsData, error: vulnsError } = await supabase
            .from('vulnerabilities')
            .select('metrics_id, vulnerability')
            .eq('metrics_id', metricsData.id)
            .limit(93);

          if (vulnsError) throw vulnsError;
          setVulns(vulnsData || []);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching data:', error);
          setError(error instanceof Error ? error.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchResults();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRedirectToPdf = () => {
    window.open('/contract/scanresult', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white__bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-red border-t-transparent"></div>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="min-h-screen bg-white__bg flex items-center justify-center">
        <div className="text-red-500">
          {error || 'Failed to load analysis results'}
        </div>
      </div>
    );
  }

  const safetyScore = calculateSafetyScore(metrics);
  const totalIssues = metrics.high_issues + metrics.medium_issues + 
                     metrics.low_issues + metrics.informational_issues + 
                     metrics.optimization_issues;

  return (
    <section className="bg-white__bg pb-20">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="mb-12 bg-white rounded-xl p-6 shadow-sm">
          {/* Top section */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center">
                <img 
                  src="/images/filescan.svg" 
                  alt="solidity file" 
                  className="w-16 h-16"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{metrics.project_name}</h1>
                <p className="text-gray-500">File Scan</p>
              </div>
            </div>
            
            {/* Export button */}
            <CustomButton
              icon={
                <svg className="w-8 h-8 white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
              }
              title="Generate report"
              containerStyles="bg-primary-red text-white font-semibold rounded-full px-4 py-2 lg:py-3 shadow-glow-red transition-all duration-300 ease-in-out transform hover:scale-105"
              handleClick={handleRedirectToPdf}
            />
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Security Score */}
            <div className="flex items-center gap-3">
              <CircularProgress 
                value={safetyScore}
                size={40}
                primaryColor="#4F46E5"
                strokeWidth={4}
              />
              <div>
                <p className="text-gray-500 text-sm">Security Score</p>
                <p className="font-bold text-xl">
                  {safetyScore.toFixed(2)}
                  <span className="text-gray-500 text-base">/100</span>
                </p>
              </div>
            </div>

            {/* Scan Duration */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 flex items-center justify-center">
                <img src="/images/scan_duration.svg" alt="scan duration"/>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Scan duration</p>
                <p className="font-bold text-xl">
                  {metrics.scan_duration}
                  <span className="ml-1">secs</span>
                </p>
              </div>
            </div>

            {/* Lines of Code */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 flex items-center justify-center">
                <img src="/images/lineofcode.svg" alt="line of code"/>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Lines of code</p>
                <p className="font-bold text-xl">{metrics.source_lines}</p>
              </div>
            </div>

            {/* Issues Count */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 flex items-center justify-center">
                <img src="/images/bug_icon.svg" alt="issues count"/>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Issues Count</p>
                <p className="font-bold text-xl">{totalIssues}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-[5] lg:w-1/3">
            <ResultBody metrics={metrics} vulns={vulns} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContractScanResult;