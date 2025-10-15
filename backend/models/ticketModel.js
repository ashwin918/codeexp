// models/ticketModel.js
const db = require('../db/db');

// Create a new ticket
exports.createTicket = async (user_id, title, description, priority) => {
  console.log('📝 Creating ticket with:', user_id, title, description, priority); // debug

  const result = await db.query(
    `INSERT INTO tickets (user_id, title, description, priority, status, created_at, updated_at)
     VALUES ($1, $2, $3, $4, 'open', NOW(), NOW())
     RETURNING *`,
    [user_id, title, description, priority]
  );
  return result.rows[0];
};

// Get all tickets
exports.getAllTickets = async () => {
  const result = await db.query('SELECT * FROM tickets ORDER BY created_at DESC');
  return result.rows;
};

// Get a ticket by ID
exports.getTicketById = async (ticket_id) => {
  const result = await db.query(
    `SELECT t.*, u.email 
     FROM tickets t
     JOIN users u ON t.user_id = u.id
     WHERE t.id = $1`,
    [ticket_id]
  );
  return result.rows[0];
};


// Get tickets by user ID
exports.getTicketsByUserId = async (userId) => {
  const result = await db.query(
    `SELECT * FROM tickets WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};


// Update ticket status or admin response
exports.updateTicket = async (ticket_id, updatedFields) => {
  const { title, description, priority, status, admin_response } = updatedFields;

  const result = await db.query(
    `UPDATE tickets
     SET title = $1,
         description = $2,
         priority = $3,
         status = $4,
         admin_response = $5,
         updated_at = NOW()
     WHERE id = $6
     RETURNING *`,
    [title, description, priority, status, admin_response, ticket_id]
  );

  return result.rows[0];
};


// Delete ticket
exports.deleteTicket = async (ticket_id) => {
  const result = await db.query('DELETE FROM tickets WHERE id = $1 RETURNING *', [ticket_id]);
  return result.rows[0]; // returns deleted ticket info
};

