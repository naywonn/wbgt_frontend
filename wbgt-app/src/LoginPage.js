import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      setUsernameError('Username is required');
      return;
    }

    if (!password) {
      setPasswordError('Password is required');
      return;
    }

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
        {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
        <form onSubmit={handleSubmit}>
          {/* Username input */}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="form-control"
            />
            <div className="error-message">{usernameError}</div>
          </div>

          {/* Password input */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-control"
            />
            <div className="error-message">{passwordError}</div>
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
