import React, { useState } from 'react';
import { createTicket } from '../api/api';
import './newtick.css';
import { useNavigate } from 'react-router-dom';

const NewTicket = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'low',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      setError('All fields are required.');
      return;
    }

    const userId = localStorage.getItem('user_id'); // ✅ Use user_id not email

    if (!userId) {
      setError('You must be logged in to submit a ticket.');
      return;
    }

    const ticketData = {
      user_id: parseInt(userId), // ✅ send correct field to match backend
      ...form
    };

    try {

     const response = await createTicket(ticketData);
console.log('🎯 Ticket response:', response);

// ✅ Updated logic:
if (response && (response.id || (response.ticket && response.ticket.id))) {
  setSuccess('Ticket submitted successfully!');
  setTimeout(() => navigate('/dashboard'), 1000);
} else {
  setError('Failed to submit ticket.');
}

    } catch (err) {
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div className="ticket-form-wrapper">
      <h2>Create New Ticket</h2>
      <form className="ticket-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            placeholder="Enter ticket title"
            value={form.title}
            onChange={handleChange}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            placeholder="Describe the issue..."
            value={form.description}
            onChange={handleChange}
            rows="5"
          />
        </label>

        <label>
          Priority:
         <select name="priority" value={form.priority} onChange={handleChange}>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>

        </label>

        {error && <div className="error-box">{error}</div>}
        {success && <div className="success-box">{success}</div>}

        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  );
};

export default NewTicket;
