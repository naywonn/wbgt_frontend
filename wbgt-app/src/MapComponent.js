// MapComponent.js
import React from 'react';
import './App.css';

const MapComponent = () => {
  return (
    <div className="map-container">
      
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/d/embed?mid=1Czu0tYxqGxS5I0pqI-gsJprPFwP7vAeW"
        width="100%"
        height="300"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen
      />
    </div>
  );
};

export default MapComponent;
