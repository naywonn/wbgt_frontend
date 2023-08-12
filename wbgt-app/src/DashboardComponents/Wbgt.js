import axios from 'axios';
import React, { useState } from 'react';

function WbgtValues() {
  const [selectedStation, setSelectedStation] = useState('');
  const [predictedValues, setPredictedValues] = useState([]);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [maintenanceInProgress, setMaintenanceInProgress] = useState(false);

  const stationOptions = [
    'S106','S44', 'S116', 'S24', 'S104', 'S109',
    'S121', 'S43', 'S50', 'S60', 'S107', 'S111', 'S115', 'S117'
  ];

  const fetchPredictedValues = async (stationId) => {
    try {
      const response = await axios.get(`http://localhost:8080/ML/predicted-wbgt/${stationId}`);
      const responseData = JSON.parse(response.data);

      if (responseData && responseData.length > 0) {
        const predictedValuesArray = responseData.map(item => parseFloat(item.predicted_value));
        setPredictedValues(predictedValuesArray);

        const minPredictedValue = Math.min(...predictedValuesArray);
        const maxPredictedValue = Math.max(...predictedValuesArray);
        setMinValue(minPredictedValue);
        setMaxValue(maxPredictedValue);
        setMaintenanceInProgress(false);
      } else {
        setPredictedValues([]);
        setMinValue(null);
        setMaxValue(null);
        setMaintenanceInProgress(true);
      }
    } catch (error) {
      console.error('Error fetching predicted value:', error);
      setPredictedValues([]);
      setMinValue(null);
      setMaxValue(null);
      setMaintenanceInProgress(true); // Reset maintenance flag if there's an error
    }
  };

  const handleStationChange = (event) => {
    const selectedStationId = event.target.value;
    setSelectedStation(selectedStationId);
    fetchPredictedValues(selectedStationId);
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Predicted WBGT Values for next 1 Hour</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <label htmlFor="stationSelect">Select Station:</label>
        <select id="stationSelect" value={selectedStation} onChange={handleStationChange} style={{ marginLeft: '10px' }}>
          <option value="">Select a station</option>
          {stationOptions.map((station) => (
            <option key={station} value={station}>
              {station}
            </option>
          ))}
        </select>
      </div>
      {maintenanceInProgress ? (
        <p style={{ marginTop: '10px', color: 'red' }}>Maintenance in progress</p>
      ) : (
        predictedValues.length > 0 && selectedStation && (
          <div style={{ marginTop: '10px' }}>
            <p>Min Predicted WBGT: {minValue !== null ? minValue.toFixed(2) : 'Loading...'}</p>
            <p>Max Predicted WBGT: {maxValue !== null ? maxValue.toFixed(2) : 'Loading...'}</p>
          </div>
        )
      )}
    </div>
  );
}

export default WbgtValues;
