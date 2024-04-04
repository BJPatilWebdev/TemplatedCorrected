// users route module.
const express = require("express");
const router = express.Router();
const {db, queryAsync } = require("../controllers/db");

// Sign-up endpoint
router.post('/signup', async (req, res) => {
  const { firstName, lastName, loginId, mobileNo, emailId, password, userType } = req.body;

  // Check if the user with the provided emailId already exists
  const checkUserExistsSql = 'SELECT COUNT(*) AS count FROM users WHERE emailId = ?';
  try {
    const [existingUsers] = await queryAsync(checkUserExistsSql, [emailId]);
    if (existingUsers.count > 0) {
      // User with the email already exists, return an error
      return res.status(400).json({ error: 'User with this email already exists' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  // User does not exist, proceed with adding the user
  const addUserSql = 'INSERT INTO users (firstName, lastName, loginId, mobileNo, emailId, password, userType) VALUES (?, ?, ?, ?, ?, ?, ?)';
  try {
    await queryAsync(addUserSql, [firstName, lastName, loginId, mobileNo, emailId, password, userType]);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sign-in endpoint
router.post('/signin', async (req, res) => {
  const { emailId } = req.body; // Corrected line
  console.log('emailId ' + emailId);
  const sql = 'SELECT * FROM users WHERE emailId = ?';
  try {
    const [result] = await queryAsync(sql, [emailId]);
    if (!result) {
      res.status(401).json({ error: 'Invalid email' });
    } else {
      res.status(200).json({ message: 'Sign-in successful', userId: result.userId });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Create a user
router.post('/users', async (req, res) => {
  const userData = req.body;
  const sql = 'INSERT INTO users SET ?';
  try {
    const result = await queryAsync(sql, userData);
    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  const sql = 'SELECT * FROM users';
  try {
    const result = await queryAsync(sql);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a user by ID
router.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT * FROM users WHERE userId = ?';
  try {
    const [result] = await queryAsync(sql, userId);
    if (!result) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user by ID
router.put('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;
  const sql = 'UPDATE users SET ? WHERE userId = ?';
  try {
    const result = await queryAsync(sql, [updatedUserData, userId]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json({ message: 'User updated successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user by ID
router.delete('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const sql = 'DELETE FROM users WHERE userId = ?';
  try {
    const result = await queryAsync(sql, userId);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json({ message: 'User deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
