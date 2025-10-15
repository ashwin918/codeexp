const adminLogModel = require('../models/adminLogModel');

// Create a new log
exports.createLog = async (req, res) => {
  const { admin_id, action } = req.body;
  try {
    const newLog = await adminLogModel.createLog(admin_id, action);
    res.status(201).json(newLog);
  } catch (error) {
    console.error('Error creating log:', error.message);
    res.status(500).json({ error: 'Failed to create log' });
  }
};

// Get all logs
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await adminLogModel.getAllLogs();
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error.message);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
};

// Delete a log by ID
exports.deleteLog = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLog = await adminLogModel.deleteLog(id);
    if (!deletedLog) {
      return res.status(404).json({ error: 'Log not found' });
    }
    res.status(200).json({ message: 'Log deleted', log: deletedLog });
  } catch (error) {
    console.error('Error deleting log:', error.message);
    res.status(500).json({ error: 'Failed to delete log' });
  }
};
