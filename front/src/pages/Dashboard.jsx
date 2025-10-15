import React, { useEffect, useState } from 'react';
import { getAllTickets } from '../api/api';
import TicketCard from '../components/TicketCard';
import './dash.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  const userEmail = localStorage.getItem('email');
  const userId = localStorage.getItem('user_id');

 useEffect(() => {
  const fetchTickets = async () => {
    const res = await getAllTickets();
    if (Array.isArray(res)) {
      const userTickets = res.filter(ticket => ticket.user_id == userId); // ✅ match by user_id
      setTickets(userTickets);
    }
  };
  fetchTickets();
}, [userId]);

  const openTickets = tickets.filter(t => t.status === 'open');
  const closedTickets = tickets.filter(t => t.status === 'closed');

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>🎫 User Dashboard</h1>
        <p>Welcome, {localStorage.getItem('name')}! Here's a quick overview of your tickets.</p>
        <button className="raise-btn" onClick={() => navigate('/new-ticket')}>
          ➕ Raise New Ticket
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card stat-total">
          <h3>Total Tickets</h3>
          <span>{tickets.length}</span>
        </div>
        <div className="stat-card stat-open">
          <h3>Open Tickets</h3>
          <span>{openTickets.length}</span>
        </div>
        <div className="stat-card stat-closed">
          <h3>Closed Tickets</h3>
          <span>{closedTickets.length}</span>
        </div>
      </div>

      <div className="ticket-section">
        <h2>Your Tickets</h2>
        {tickets.length > 0 ? (
          tickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)
        ) : (
          <p>No tickets found for your account.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
