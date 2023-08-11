import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';

function LineChart() {
  const lineCanvasRef = useRef(null);
  const lineChartInstanceRef = useRef(null);
  const [lineChartData, setLineChartData] = useState(null);

  useEffect(() => {
    const fetchMSEValues = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ML/all_mse');
        const mseData = response.data;

        
        const stationIds = Object.keys(mseData);
        const mseValues = Object.values(mseData);

        
        const chartData = {
          labels: stationIds,
          datasets: [
            {
              label: 'Mean Square Error',
              data: mseValues,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
            },
          ],
        };

        setLineChartData(chartData);
      } catch (error) {
        console.error('Error fetching MSE values:', error);
      }
    };

    fetchMSEValues();
  }, []);

  useEffect(() => {
    if (lineChartData) {
      const lineCanvas = lineCanvasRef.current;
      const lineCtx = lineCanvas.getContext('2d');

      // Destroy the previous chart instance if it exists
      if (lineChartInstanceRef.current) {
        lineChartInstanceRef.current.destroy();
      }

      // Create the line chart
      lineChartInstanceRef.current = new Chart(lineCtx, {
        type: 'line',
        data: lineChartData,
        options: {
          // Add your line chart options here if needed
        },
      });

      // Cleanup function to destroy the chart instance when the component unmounts
      return () => {
        if (lineChartInstanceRef.current) {
          lineChartInstanceRef.current.destroy();
        }
      };
    }
  }, [lineChartData]);

  return (
    <div className="chart-container">
      <canvas ref={lineCanvasRef} />
    </div>
  );
}

export default LineChart;
