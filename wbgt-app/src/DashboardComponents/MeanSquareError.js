import axios from 'axios';
import React, { useEffect, useState } from 'react';

function MeanSquareError() {
  const [minMSE, setMinMSE] = useState(null);
  const [maxMSE, setMaxMSE] = useState(null);

  useEffect(() => {
    const fetchMSEValues = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ML/all_mse');
        const mseData = response.data;

        // Filter out the error value (0) from the mseValues array
        const mseValues = Object.values(mseData).filter(value => value !== 0);

        setMinMSE(Math.min(...mseValues));
        setMaxMSE(Math.max(...mseValues));
      } catch (error) {
        console.error('Error fetching MSE values:', error);
      }
    };

    fetchMSEValues();
  }, []);


  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Mean Square Error</h3>
      <p>Min: {minMSE !== null ? minMSE.toFixed(15) : 'Loading...'}</p>
      <p>Max: {maxMSE !== null ? maxMSE.toFixed(15) : 'Loading...'}</p>
    </div>
  );
}

export default MeanSquareError;
