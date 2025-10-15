const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db/db');

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/viewers', require('./routes/viewerRoutes'));
app.use('/api/admin-logs', require('./routes/adminLogRoutes'));



// Default route
app.get('/', (req, res) => {
  res.send('🎫this Ticket Issuing System API is running!tight tight');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
