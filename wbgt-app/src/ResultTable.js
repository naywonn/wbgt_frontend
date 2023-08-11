import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ResultTable() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/all_current');
      // console.log("Received data:", response.data);
      // Parse the JSON string to convert it into a JavaScript array
      const jsonData = JSON.parse(response.data);
      
      setTableData(jsonData);
      // setTableData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const formatDateTime = (dateTimeStr) => {
    const options = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    const dateTime = new Date(dateTimeStr);
    const dateFormatter = new Intl.DateTimeFormat('en', options);
    const currentDate = new Date();

    if (dateTime.toDateString() !== currentDate.toDateString()) {
      return "Maintenance in progress";
    }

    return `${dateFormatter.format(dateTime)} `;
  };


  return (
    <div className="table-container">
      <h6>Results for all stations</h6>
      <table className="result-table">
        <thead>
          <tr>
            <th scope="col">Station ID</th>
            <th scope="col">Temperature(°C)</th>
            <th scope="col">Relative Humidity(%)</th>
            <th scope="col">Timestamp</th>
            <th scope="col">WBGT Reading</th>
            <th scope="col">Category </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, index) => (
            <tr key={rowData.station_id}>
              <td>{rowData.station_id}</td>
              <td>{rowData.temperature}</td>
              <td>{rowData.humidity}</td>
              <td>{formatDateTime(rowData.timestamp)}</td>
              <td>{formatDateTime(rowData.timestamp) !== "Maintenance in progress"
                ? rowData.WBGT.toFixed(1)
                : "Maintenance in progress"}</td>
               <td>{formatDateTime(rowData.timestamp) !== "Maintenance in progress"
                ? rowData.Category
                : "Maintenance in progress"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


