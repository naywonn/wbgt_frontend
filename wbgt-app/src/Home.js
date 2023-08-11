import React from 'react';

import AboutUs from './AboutUs';
import './App.css';
import AppDescription from './AppDescription';
import MapComponent from './MapComponent';
import ResultTable from './ResultTable';

function Home() {

    return (
        <div>
            <div className="title-container">
                <h2 className="title">Welcome to the Web Bulb Globe Temperature Application</h2>
            </div>
            
            <h6>Get Wet Bulb Globe Temperature Across Singapore</h6>
            <AppDescription />
            <h6>Weather Stations Map</h6>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <MapComponent />
            </div>
            <h6>WBGT Chart</h6>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src="/WBGT_Chart.jpg" alt="WBGT Chart" className="wbgt-chart-img" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ResultTable />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p>For more info, please download our app here</p>
                <img src="/wbgt.jpeg" alt="Logo" className="logo-img2" />
            </div>
            <AboutUs />
        </div>
    );
}

export default Home;
