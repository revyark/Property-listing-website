import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import pt1 from './images/pt1.jpg';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-image" style={{ backgroundImage: `url(${pt1})` }}></div>
      <div className="login-form">
        <h1 className="logo">AGAR</h1>
        <h2 className="tagline">
          Log in to unlock the best of <span className="highlight">AGAR.</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <label>Email *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Password *</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="login-button">Log in</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="register-link">
          Don't have an account? <a href="/signup">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
