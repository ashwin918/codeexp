import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    } else {
      setIsLoggedIn(false);
      setUserEmail('');
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserEmail('');
    navigate('/login');
  };

  const isAdmin = userEmail.toLowerCase() === 'admin1@example.com';

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        🎫 TicketHub
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        {isLoggedIn ? (
          <>
            <Link to={isAdmin ? "/admin-dashboard" : "/dashboard"}>Dashboard</Link>

            {!isAdmin && (
              <>
                <Link to="/new-ticket">New Ticket</Link> {/* ✅ User only */}
              </>
            )}

            {isAdmin && (
              <>
                <Link to="/tickets">Tickets</Link>
                <Link to="/viewers">Viewers</Link>
                <Link to="/admin-logs">Admin Logs</Link>
              </>
            )}

            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
