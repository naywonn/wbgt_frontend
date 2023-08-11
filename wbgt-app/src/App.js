import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';
import AddStaff from "./Staffs/AddStaff";
import EditStaff from "./Staffs/EditStaff";
import ViewStaff from "./Staffs/ViewStaff";
import StaffsList from './StaffsList';

import Home from './Home';
import NavigationBar from './NavigationBar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authenticatedStaff, setAuthenticatedStaff] = useState(null);

  function handleLogin(username, password) {
    // Make a POST request to your backend's login endpoint
    fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: username, password }),
    })
      .then((response) => {
        
        if (response.ok) {
          setIsLoggedIn(true);
          
          setAuthenticatedStaff({ id: username, title: 'admin' });
        }else {
          console.error('Login error:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  }

  function handleLogout() {
    // Make a POST request to your backend's logout endpoint
    fetch('http://localhost:8080/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(false);
          setAuthenticatedStaff(null);
        }
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }


  return (
    <BrowserRouter>
      <NavigationBar
        isLoggedIn={isLoggedIn}
        authenticatedStaff={authenticatedStaff}
        handleLogout={handleLogout}
      />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard authenticatedStaff={authenticatedStaff} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route path="/api/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/staffsList" element={<StaffsList />} />
          <Route path="/addStaff" element={<AddStaff />} />
          <Route exact path="/editStaff/:id" element={<EditStaff />} />
          <Route exact path="/viewStaff/:id" element={<ViewStaff />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
