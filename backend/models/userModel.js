// models/userModel.js
const db = require('../db/db');

// Get user by email
const getUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

// Create a new user
const createUser = async (name, email, password, role = 'user') => {
  const result = await db.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role`,
    [name, email, password, role]
  );
  return result.rows[0];
};

// Get all users
const getAllUsers = async () => {
  const result = await db.query('SELECT id, name, email, role FROM users');
  return result.rows;
};

module.exports = {
  getUserByEmail,
  createUser,
  getAllUsers,
};
