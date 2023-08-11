import axios from 'axios';
import React, { useState } from 'react';

function WbgtValues() {
  const [selectedStation, setSelectedStation] = useState('');
  const [predictedValues, setPredictedValues] = useState([]);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);

  const stationOptions = [
    'S44', 'S116', 'S24', 'S104', 'S109',
    'S121', 'S43', 'S50', 'S60', 'S107', 'S111', 'S115', 'S117'
  ];

  const fetchPredictedValues = async (stationId) => {
    try {
      const response = await axios.get(`https://wbgtgroup9.azurewebsites.net/predict?hour=1&station_id=${stationId}`);
      const responseData = JSON.parse(response.data);
  
      const predictedValues = responseData.map(item => parseFloat(item.predicted_value));
      setPredictedValues(predictedValues);
  
      setMinValue(Math.min(...predictedValues));
      setMaxValue(Math.max(...predictedValues));
    } catch (error) {
      console.error('Error fetching predicted values:', error);
      setPredictedValues([]);
      setMinValue(null);
      setMaxValue(null);
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
      {predictedValues.length > 0 && selectedStation && (
        <div style={{ marginTop: '10px' }}>
          <p>Min Predicted WBGT: {minValue !== null ? minValue.toFixed(2) : 'Loading...'}</p>
          <p>Max Predicted WBGT: {maxValue !== null ? maxValue.toFixed(2) : 'Loading...'}</p>
         
        </div>
      )}
    </div>
  );
}

export default WbgtValues;
