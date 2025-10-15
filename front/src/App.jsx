import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Viewers from './pages/Viewers';
import Tickets from './pages/Tickets';
import AdminLogs from './pages/AdminLogs';
import NewTicket from './pages/NewTicket';
import EditTicket from './pages/EditTicket';
import TicketDetail from './pages/TicketDetail';
import AdminDashboard from './pages/AdminDashboard';

// Components
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-ticket" element={<NewTicket />} />
        <Route path="/tickets/:id" element={<TicketDetail />} />
        <Route path="/ticket/:id" element={<TicketDetail/>} />

        <Route path="/edit-ticket/:id" element={<EditTicket />} />

        {/* Admin Dashboard & Management */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/viewers" element={<Viewers />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/admin-logs" element={<AdminLogs />} />
      </Routes>
    </Router>
  );
};

export default App;
