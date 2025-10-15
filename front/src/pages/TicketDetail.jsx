import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicketById, deleteTicket } from '../api/api';
import './ticdetail.css';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  const currentUserEmail = localStorage.getItem('email');
  const isAdmin = currentUserEmail === 'admin@email.com';
  // const isOwner = ticket?.email === currentUserEmail;

  useEffect(() => {
    const fetchTicket = async () => {
      const res = await getTicketById(id);
      setTicket(res);
    };
    fetchTicket();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Delete this ticket permanently?')) {
      await deleteTicket(id);
      isAdmin ? navigate('/tickets') : navigate('/dashboard');
    }
  };

  if (!ticket) return <div className="ticket-detail">Loading...</div>;

  const isOwner = ticket?.email === currentUserEmail;

  return (
    <div className="ticket-detail">
      <h2>🎫 Ticket Details</h2>
      <div className="ticket-box">
        <h3>{ticket.title}</h3>
        <p><strong>Description:</strong> {ticket.description}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Priority:</strong> {ticket.priority}</p>
        <p><strong>Created At:</strong> {new Date(ticket.created_at).toLocaleString()}</p>

      {(isAdmin || isOwner) && (
  <div className="ticket-actions">
    <button onClick={() => navigate(`/edit-ticket/${ticket.id}`)}>✏️ Edit</button>
    <button className="delete-btn" onClick={handleDelete}>🗑️ Delete</button>
  </div>
)}

      </div>
    </div>
  );
};

export default TicketDetail;
