// import React from 'react';

import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/signup', {  
        username, 
        password,
      });
  
      if (response.status === 200) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Signup failed. Please try again.'); 
    }
  };


    return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" id="signup-form"  onSubmit={handleSignup}>
        <div className="input-group">
          <label htmlFor="username" className="input-label">Username</label>
          <input type="text" id="username" name="username" className="input-field" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="input-label">Password</label>
          <input type="password" id="password" name="password" className="input-field" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />

        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>

    
  );
}

export default SignupPage;
