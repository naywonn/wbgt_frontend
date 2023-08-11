import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Call the onLogin function with the entered username and password
    try {
      await onLogin(username, password);
      // Redirect to the dashboard page on successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error here, e.g., show an error message
    }
  };


  return (
    <div className="page-container">
      <div className="login-container">

      <h3>Login Page</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
