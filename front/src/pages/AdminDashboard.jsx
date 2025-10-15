import React, { useEffect, useState } from 'react';
import { getAllTickets, getAllViewers, getAllAdminLogs } from '../api/api';
import TicketCard from '../components/TicketCard';
import AdminLogCard from '../components/AdminLogCard';
import './admin.css';

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [viewers, setViewers] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const t = await getAllTickets();
      const v = await getAllViewers();
      const l = await getAllAdminLogs();

      setTickets(t || []);
      setViewers(v || []);
      setLogs(l || []);
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>🛠️ Admin Dashboard</h1>
        <p>Monitor platform activity, viewer details, and ticket submissions.</p>
      </div>

      <div className="admin-metrics">
        <div className="metric-box">
          <h3>Total Tickets</h3>
          <span>{tickets.length}</span>
        </div>
        <div className="metric-box">
          <h3>Viewers</h3>
          <span>{viewers.length}</span>
        </div>
        <div className="metric-box">
          <h3>Admin Logs</h3>
          <span>{logs.length}</span>
        </div>
      </div>

      <div className="admin-section">
        <h2>📋 Recent Tickets</h2>
        <div className="admin-ticket-list">
          {tickets.slice(0, 5).map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>

      <div className="admin-section">
        <h2>📜 Recent Admin Logs</h2>
        <div className="admin-log-list">
          {logs.slice(0, 5).map((log) => (
            <AdminLogCard key={log.id} log={log} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
