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
          '#eab308',  // yellow-500
          '#dc2626'      // red-600
        ],
        borderColor: '#f7f8f7',
        borderWidth: 8,
        borderRadius: 14,
        hoverBackgroundColor: [
          '#2563eb',    // blue-600
          '#4b5563',    // gray-600
          '#16a34a',   // green-600
          '#ca8a04',  // yellow-600
          '#b91c1c'      // red-700
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
          boxWidth: 15,
          padding: 20,
          font: {
            family: 'Outfit',
            size: 14,
            weight: '400',
          },
          color: '#000',
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
      className="w-full p-6 mb-7"
    >


      <div
        className="rounded-xl p-6 w-full bg-gray-50"
        style={{
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >



        <div style={{ width: '100%', height: '300px' }}> {/* Set height to ensure chart fits */}
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
