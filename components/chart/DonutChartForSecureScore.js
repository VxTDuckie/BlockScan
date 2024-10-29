import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '@fontsource/outfit';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ score }) => {
  const notScore = 100 - score;

  const data = {
    labels: ['Score', 'Remaining portion'],
    datasets: [
      {
        label: 'Score',
        data: [score, notScore],
        backgroundColor: ['#e73606', '#ffffff'],
        borderColor: '#ffffff',
        borderWidth: 0,
        borderRadius: 14,
      },
    ],
  };

  const options = {
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataValue = tooltipItem.raw.toFixed(2);
            return `${dataValue}/100`; // Use backticks for template literals
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
  titleFont: {
    size: 14,
    weight: 'bold'
  },
  bodyColor: '#fff',
  bodyFont: {
    size: 13
  },
  padding: 10,
  displayColors: false, // Hide color boxes
  position: 'nearest'
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    hover: {
      mode:null
    }
  };

  // Custom plugin to render text inside the doughnut chart
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.restore();
      const fontSize = (height / 100).toFixed(2); // Adjust font size based on chart height
      ctx.font = `${fontSize}em 'Outfit', sans-serif`;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#000000'; // Text color
      const formattedScore = score.toFixed(2)
      const text = `${formattedScore}`;
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;

      ctx.fillText(text, textX, textY); // Draw the text
      ctx.save();
    },
  };
  const centerFillPlugin = {
    id: 'centerFill',
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = chart._metasets[0].data[0].outerRadius * 0.6; // Adjust based on cutout size

      // Draw a filled circle in the center
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, (2 * Math.PI));
      ctx.fillStyle = '#ffecdf'; // Fill color of the center area
      ctx.fill();
      ctx.restore();
    },
  };
  const chartFillPlugin = {
    id: 'centerFill',
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = chart._metasets[0].data[0].outerRadius * 1; // Adjust based on cutout size

      // Draw a filled circle in the center
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, (2 * Math.PI));
      ctx.fillStyle = '#ffffff'; // Fill color of the center area
      ctx.fill();
      ctx.restore();
    },
  };

  return (
    <div className="w-auto h-52">
      <Doughnut data={data} options={options} plugins={[chartFillPlugin, centerFillPlugin, centerTextPlugin]}/>
    </div>
  );
};

export default DonutChart;
