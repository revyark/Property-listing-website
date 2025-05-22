import React, { useState } from 'react';
import './Login.css';
import pt1 from './images/pt1.jpg';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="login-container">
      <div className="login-image" style={{backgroundImage: `url(${pt1})`}}></div>
      <div className="login-form">
        <h1 className="logo">AGAR</h1>
        <h2 className="tagline">Log in to unlock the best of <span className="highlight">AGAR.</span></h2>

        <form onSubmit={handleSubmit}>
          <label>Email *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Password *</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="login-button">Log in</button>
        </form>

        <p className="register-link">
            Don't have an account? <a href="#">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
