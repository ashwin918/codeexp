import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicketById, updateTicket } from '../api/api';
import './edit.css';

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      const data = await getTicketById(id);
      if (data) setTicket(data);
      else setError('Ticket not found');
    };
    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticket.title || !ticket.description || !ticket.priority) {
      setError('All fields are required.');
      return;
    }

    const res = await updateTicket(id, ticket);
    console.log("Update response:", res);

if (res && res.ticket && res.ticket.id) {
  setSuccess('Ticket updated successfully!');
  setTimeout(() => navigate(`/ticket/${id}`), 1000);
} else {
  setError('Update failed.');
}

  }

  if (!ticket) return <div className="edit-ticket">Loading...</div>;

  return (
    <div className="edit-ticket">
      <h2>Edit Ticket</h2>
      <form className="ticket-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={ticket.title}
            onChange={handleChange}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={ticket.description}
            onChange={handleChange}
            rows="5"
          />
        </label>

        <label>
          Priority:
          <select
            name="priority"
            value={ticket.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Status:
          <select
            name="status"
            value={ticket.status}
            onChange={handleChange}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </label>

        {error && <div className="error-box">{error}</div>}
        {success && <div className="success-box">{success}</div>}

        <button type="submit">Update Ticket</button>
      </form>
    </div>
  );
};

export default EditTicket;
