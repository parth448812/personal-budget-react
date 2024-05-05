// import React from 'react';

import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import pako from 'pako';

function LoginPage() {
  
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { 
        username,
        password,
      });
        console.log('Server response:', response);
        console.log('Server response:', response.data);
      if (response.status === 200 && response.data.message === 'Login successful') {
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again.');
    }
  };
  
    return (
      <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form className="login-form" id="login-form" onSubmit={handleLogin}>
            <div className="input-group">
                <label htmlFor="username" className="input-label">Username</label>
                <input type="text" id="username" name="username" className="input-field" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            </div>
            <div className="input-group">
                <label htmlFor="password" className="input-label">Password</label>
                <input type="password" id="password" name="password" className="input-field" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            </div>
              <button type="submit" className="login-button">Login</button>
            </form>
            <p className="signup-link">Don't have an account? <a href="/signup">Sign up</a></p>
        </div>

    );
}

export default LoginPage;
