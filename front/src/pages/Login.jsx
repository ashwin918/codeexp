import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';
import '../styles/main.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

const adminEmails = ['admin1@example.com'];
 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await loginUser(form);

  if (response.error) {
    setError(response.error);
  } else if (response.message === 'Login successful') {
    const user = response.user; // ✅ Fix here

    localStorage.setItem('email', user.email);      // ✅ Save from response.user
    localStorage.setItem('user_id', user.id);
    localStorage.setItem('name', user.name);
    localStorage.setItem('role', user.role);

    const isAdmin = adminEmails.includes(user.email.toLowerCase());

    if (isAdmin) {
      navigate('/admin-dashboard');
    } else {
      navigate('/dashboard');
    }
  } else {
    setError('Invalid credentials');
  }
};



  return (
    <div className="auth-background">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Please enter your credentials to log in.</p>
        <form onSubmit={handleSubmit} className="auth-form">
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
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p className="auth-footer">Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
