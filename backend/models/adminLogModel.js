const db = require('../db/db');

// Create new admin log
exports.createLog = async (admin_id, action) => {
  const result = await db.query(
    'INSERT INTO admin_logs (admin_id, action) VALUES ($1, $2) RETURNING *',
    [admin_id, action]
  );
  return result.rows[0];
};

// Get all admin logs
exports.getAllLogs = async () => {
  const result = await db.query('SELECT * FROM admin_logs ORDER BY log_time DESC');
  return result.rows;
};

// Delete log by ID
exports.deleteLog = async (id) => {
  const result = await db.query('DELETE FROM admin_logs WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

