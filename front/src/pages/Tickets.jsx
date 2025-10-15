import React, { useEffect, useState } from 'react';
import { getAllTickets } from '../api/api';
import TicketCard from '../components/TicketCard';
import './tickets.css';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await getAllTickets();
      setTickets(res || []);
    };

    fetchTickets();
  }, []);

  return (
    <div className="tickets-page">
      <h2>📋 All Tickets</h2>
      <p>Below are all the tickets submitted in the system.</p>

      <div className="ticket-list">
        {tickets.length > 0 ? (
          tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
        ) : (
          <p>No tickets found.</p>
        )}
      </div>
    </div>
  );
};

export default Tickets;
