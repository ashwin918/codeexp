import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';
import '../styles/main.css';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', // ✅ updated from username → name
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser(form); // ✅ now includes correct `name`

    if (response.error) {
      setError(response.error);
      setSuccessMsg('');
    } else if (response.message === 'User registered successfully') {
      setSuccessMsg('Registration successful! Redirecting to login...');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError('Registration failed. Try again.');
    }
  };

  return (
    <div className="auth-background">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join us and start managing tickets easily.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="name" // ✅ updated
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="auth-input"
          />
          {error && <p className="auth-error">{error}</p>}
          {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
          <button type="submit" className="auth-button">Register</button>
        </form>
        <p className="auth-footer">Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;
