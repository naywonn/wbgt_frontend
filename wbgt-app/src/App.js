import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import FaqPage from './FaqPage';
import Home from './Home';
import LoginPage from './LoginPage';
import NavigationBar from './NavigationBar';
import AddStaff from "./Staffs/AddStaff";
import EditStaff from "./Staffs/EditStaff";
import ViewStaff from "./Staffs/ViewStaff";
import StaffsList from './StaffsList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authenticatedStaff, setAuthenticatedStaff] = useState(null);

  function handleLogin(username, password) {
    // Make a POST request to your backend's login endpoint
    fetch('http://localhost:8080/staff/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'username': username, 'password': password }),
      credentials: 'include', // Include credentials (cookies)
    })
      .then((response) => {
        
        if (response.ok) {
          setIsLoggedIn(true);
          
          setAuthenticatedStaff({ 'username': username, 'title': 'admin' });
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
    fetch('http://localhost:8080/staff/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          console.log("I am inside handle logout");
          setIsLoggedIn(false);
          console.log(isLoggedIn);
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
                <Navigate to="/dashboard" /> 
              )
            }
          />
          <Route path="/staff/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/staffsList" element={<StaffsList />} />
          <Route path="/addStaff" element={<AddStaff />} />
          <Route exact path="/editStaff/:id" element={<EditStaff />} />
          <Route exact path="/viewStaff/:id" element={<ViewStaff />} />
          <Route path="/faq" element={<FaqPage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
