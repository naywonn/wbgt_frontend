import React from 'react';

function WbgtRange({ minWbgt, maxWbgt }) {
  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>CurrentWBGT Range</h3>
      {minWbgt !== null && maxWbgt !== null ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ marginBottom: '5px' }}>
            Min WBGT: {minWbgt.toFixed(2)}
          </p>
          <p>
            Max WBGT: {maxWbgt.toFixed(2)}
          </p>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

export default WbgtRange;
