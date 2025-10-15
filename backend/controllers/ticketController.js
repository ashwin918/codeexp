// controllers/ticketController.js
const ticketModel = require('../models/ticketModel');

// Create a new ticket
exports.createTicket = async (req, res) => {
  const { user_id, title, description, priority } = req.body;

  // Basic validation
  if (!user_id || !title || !description || !priority) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newTicket = await ticketModel.createTicket(user_id, title, description, priority);
    res.status(201).json({ message: 'Ticket created', ticket: newTicket });
  } catch (error) {
    console.error('❌ Error creating ticket:', error.message);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
};


// Get tickets for a specific user by user_id
exports.getTicketsByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId); // get from URL

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const tickets = await ticketModel.getTicketsByUserId(userId);
    res.status(200).json(tickets);
  } catch (error) {
    console.error('❌ Error fetching user tickets:', error.message);
    res.status(500).json({ error: 'Failed to fetch user tickets' });
  }
};




// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketModel.getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    console.error('❌ Error fetching tickets:', error.message);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

// Get a ticket by ID
exports.getTicketById = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await ticketModel.getTicketById(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.status(200).json(ticket); // ✅ Includes user email if JOIN is fixed in model
  } catch (error) {
    console.error('❌ Error fetching ticket:', error.message);
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
};

// Update a ticket (status and admin response)
exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  const requiredFields = ['title', 'description', 'priority', 'status'];

  // Optional: Check for required fields
  const missing = requiredFields.filter((field) => !updatedFields[field]);
  if (missing.length > 0) {
    return res.status(400).json({ error: `Missing fields: ${missing.join(', ')}` });
  }

  try {
    const updated = await ticketModel.updateTicket(id, updatedFields);
    res.status(200).json({ message: 'Ticket updated', ticket: updated });
  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    res.status(500).json({ error: 'Failed to update ticket' });
  }
};

exports.deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTicket = await ticketModel.deleteTicket(id);
    if (!deletedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.status(200).json({ message: 'Ticket deleted', ticket: deletedTicket });
  } catch (error) {
    console.error('❌ Error deleting ticket:', error.message);
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
};

