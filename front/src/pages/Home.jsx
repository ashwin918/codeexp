
import React, { useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { createViewerLog } from '../api/api'; 

const Home = () => {
  const navigate = useNavigate();

   useEffect(() => {
    createViewerLog();
  }, []);


  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to <span>TicketHub</span></h1>
          <p>Your centralized system to submit, manage, and track technical issues effortlessly.</p>
          <button onClick={() => navigate('/login')}>Get Started</button>
        </div>
        <img src="https://www.radiancerealty.in/img/radiance-the-prime.jpg" alt="TicketHub Hero" className="hero-image" />
      </section>

      {/* Highlights */}
      <section className="highlights">
        <h2>Why Choose TicketHub?</h2>
        <div className="highlight-cards">
          <div className="highlight-card">
            <h3>Instant Ticketing</h3>
            <p>Create tickets with just a few clicks. No more long email threads.</p>
          </div>
          <div className="highlight-card">
            <h3>Real-Time Tracking</h3>
            <p>Track the status of every issue in real time, from open to resolved.</p>
          </div>
          <div className="highlight-card">
            <h3>Admin Oversight</h3>
            <p>Admins have full control with insights, activity logs, and viewer management.</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features">
        <h2>Platform Features</h2>
        <div className="features-grid">
          <div className="feature-box">📝 Submit New Tickets</div>
          <div className="feature-box">📊 View Ticket Status</div>
          <div className="feature-box">👥 Viewer Access Control</div>
          <div className="feature-box">🕵️‍♂️ Admin Activity Logs</div>
          <div className="feature-box">⚡ Priority-Based Sorting</div>
          <div className="feature-box">📱 Fully Responsive UI</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 TicketHub | Built with 💻 by Ashwin</p>
        <div className="footer-links">
          <a href="#">Contact</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
