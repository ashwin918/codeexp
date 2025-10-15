import React from 'react';
import './ticket.css';
import { useNavigate } from 'react-router-dom';
import { deleteTicket } from '../api/api';

const TicketCard = ({ ticket }) => {
  const {
    id,
    title,
    description,
    status,
    priority,
    created_at,
  } = ticket;

  const navigate = useNavigate();
const isAdmin = localStorage.getItem('role') === 'admin';
console.log("ROLE:", localStorage.getItem('role'));

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      await deleteTicket(id);
      window.location.reload();
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };

  return (
    <div
      className={`ticket-card ${priority}`}
      onClick={() => navigate(`/tickets/${id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="ticket-header">
        <h3>{title}</h3>
        <span className={`status ${status.toLowerCase()}`}>{status}</span>
      </div>
      <p className="ticket-desc">{description}</p>
      <div className="ticket-meta">
        <span className="priority">Priority: {priority}</span>
        <span className="date">Created: {formatDate(created_at)}</span>
      </div>

   {console.log("isAdmin:", isAdmin)}
{isAdmin && (
  <div className="ticket-actions" onClick={(e) => e.stopPropagation()}>
    <button onClick={() => navigate(`/edit-ticket/${id}`)}>✏️ Edit</button>
    <button className="delete-btn" onClick={() => handleDelete(id)}>🗑️ Delete</button>
  </div>
)}

    </div>
  );
};

export default TicketCard;
