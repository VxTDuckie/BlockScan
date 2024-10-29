"use client";
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const DonutChart =  ({Optimization, Informational, Low, Medium, High}) => {
  const data = {
    labels: ['Optimization', 'Informational', 'Low', 'Medium', 'High'], //set properties for the chart and nodes
    datasets: [
      {
        label: 'Issues',
        data: [Optimization, Informational, Low, Medium, High],
        backgroundColor: [
          '#3b82f6',    // blue-500
          '#6b7280',    // gray-500
          '#22c55e',   // green-500
          '#facc15',  // yellow-400
          '#e73606'      // primary-red
        ],
        borderColor: '#F9FAFB',
        hoverBorderColor: '#F9FAFB',
        borderWidth: 4,
        borderRadius: 0,
        hoverBackgroundColor: [
          '#60a5fa',    // blue-600
          '#9ca3af',    // gray-600
          '#4ade80',   // green-600
          '#fde047',  // yellow-600
          '#eb4f27'      // primary-red
        ],
        hoverOffset: 25,  // Makes segments pop out on hover
      },
    ],
  };

  const options = {
    cutout:'0%',
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        bottom: 20
      }
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          generateLabels: (chart) => {
            const dataset = chart.data.datasets[0];
            return chart.data.labels.map((label, i) => {
              const value = dataset.data[i];
              return {
                text: `${label}: ${value}`, // Use backticks for template literals
                fillStyle: dataset.backgroundColor[i],
                strokeStyle: undefined,
                lineWidth: 0,
                borderRadius: 3,
              };
            });
          },
          boxWidth: 55,
          padding: 20,
          font: {
            family: 'Outfit',
            size: 14,
            weight: '400',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataValue = tooltipItem.raw;
            return `${tooltipItem.label}: ${dataValue}`; // Use backticks for template literals
          },
        },
      },
    },
  };

  return (
    <div
      className="w-full"
    >


      <div
        className="rounded-xl p-6 w-full bg-gray-50 flex, items-center, justify-center">
        <div className="w-full h-[300px]"> {/* Set height to ensure chart fits */}
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
