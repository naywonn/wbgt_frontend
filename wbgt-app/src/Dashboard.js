import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

import HistogramChart from './DashboardComponents/HistogramChart';
import LineChart from './DashboardComponents/LineChart';
import MeanSquareError from './DashboardComponents/MeanSquareError';
import WbgtValues from './DashboardComponents/Wbgt';
import WbgtRange from './DashboardComponents/WbgtRange';

function Dashboard() {
  const [histogramChartData, setHistogramChartData] = useState(null);

  const [stationIds, setStationIds] = useState([]);

  
  useEffect(() => {
    axios.get('http://localhost:8080/ML/all_current')
      .then((response) => {
        const data = JSON.parse(response.data);

        // Extract station IDs from the API response
        const extractedStationIds = data.map((item) => item.station_id);
        setStationIds(extractedStationIds);

        // Get the current date in YYYY-MM-DD format
        const currentDate = new Date().toISOString().split('T')[0];

        // Filter data for the current date
        const currentDayData = data.filter((item) => item.timestamp.startsWith(currentDate));

        // Create an object to map station IDs to WBGT values
        const stationToWBGT = currentDayData.reduce((acc, item) => {
          acc[item.station_id] = item.WBGT;
          return acc;
        }, {});

        // Create histogram data array with 0 values for stations not in current date's data
        const histogramData = stationIds.map((stationId) => stationToWBGT[stationId] || 0);

        const chartData = {
          labels: stationIds,
          datasets: [
            {
              data: histogramData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        };

        setHistogramChartData(chartData);
      })
      .catch((error) => {
        console.error('Error fetching API data:', error);
      });
  }, [stationIds]);


  const histogramDataValues = histogramChartData
    ? histogramChartData.datasets[0].data
    : [];
  const nonZeroHistogramData = histogramDataValues.filter((value) => value !== 0);
  const minWbgt = nonZeroHistogramData.length > 0 ? Math.min(...nonZeroHistogramData) : null;
  const maxWbgt = nonZeroHistogramData.length > 0 ? Math.max(...nonZeroHistogramData) : null;


  const lineChartData = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        label: 'Line Chart Data',
        data: [29, 30, 27],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <div className="title-container">
        <h2 className="title">DashBoard Page</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="dashboard-box">
          <MeanSquareError />
        </div>
        <div className="dashboard-box">
          <WbgtRange minWbgt={minWbgt} maxWbgt={maxWbgt} />
        </div>
        <div className="dashboard-box">
          <WbgtValues />
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-section">
          <h3>Mean Square Error Chart</h3>
          <LineChart lineChartData={lineChartData} />
        </div>
        <div className="chart-section">
          <h3>WBGT Values Chart</h3>
          <HistogramChart histogramChartData={histogramChartData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
