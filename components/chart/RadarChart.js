"use client";
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ labels, scores }) => {
  const data = {
    labels, // Dynamic labels from props
    datasets: [
      {
        label: 'Score',
        data: scores, // Dynamic data from props
        backgroundColor: 'rgba(231, 54, 6, 0.2)',
        borderColor: 'rgba(231, 54, 6, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'black',
        pointBorderColor: 'rgba(255, 255, 255, 1)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(231, 54, 6)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: '#000',
        },
        angleLines: {
          display: true,
        },
        pointLabels: {
          font: {
            family: 'Outfit',
            size: 16,
            weight: 'bold',
            display: false,
          },
          color: '#000',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div
      className="w-full p-6 mb-7"
      style={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        backgroundColor: '#fff',
      }}
    >
      <div className='flex justify-between items-center mb-4'>
        <h2 className="text-2xl font-bold" style={{ fontFamily: "Outfit" }}>
          Score Breakdown
        </h2>
        <p className="text-lg font-bold text-subtitle__grey">
          Total Score: <span className='text-primary-red'>93/100</span>
        </p>
      </div>

      <div
        className="rounded-lg p-6 w-full"
        style={{
          backgroundColor: 'rgba(240, 240, 240, 0.5)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '115%', height: '300px' }}> {/* Increased height for a bigger chart */}
          <Radar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default RadarChart;
