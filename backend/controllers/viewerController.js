// controllers/viewerController.js
const db = require('../db/db');

// GET all viewer logs
exports.getViewerLogs = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM viewer_logs ORDER BY visited_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch viewer logs' });
  }
};

// POST new viewer log
exports.createViewerLog = async (req, res) => {
  const { ip_address, user_agent } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO viewer_logs (ip_address, user_agent) VALUES ($1, $2) RETURNING *',
      [ip_address, user_agent]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create viewer log' });
  }
};
