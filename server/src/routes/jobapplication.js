// jobapplocation route module.
const express = require("express");
const router = express.Router();
const {db, queryAsync } = require("../controllers/db");


// Create job application
router.post('/jobapplication', async (req, res) => {
  const jobApplicationData = req.body;
  const sql = 'INSERT INTO jobApplications SET ?';
  try {
    const result = await queryAsync(sql, jobApplicationData);
    res.status(201).json({ message: 'Job application created successfully', applicationId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all job applications
router.get('/jobapplications', async (req, res) => {
  const sql = 'SELECT * FROM jobApplications';
  try {
    const result = await queryAsync(sql);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get job application by ID
router.get('/jobapplication/:applicationId', async (req, res) => {
  const applicationId = req.params.applicationId;
  const sql = 'SELECT * FROM jobApplications WHERE applicationId = ?';
  try {
    const [result] = await queryAsync(sql, applicationId);
    if (!result) {
      res.status(404).json({ message: 'Job application not found' });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update job application by ID
router.put('/jobapplication/:applicationId', async (req, res) => {
  const applicationId = req.params.applicationId;
  const updatedJobApplicationData = req.body;
  const sql = 'UPDATE jobApplications SET ? WHERE applicationId = ?';
  try {
    const result = await queryAsync(sql, [updatedJobApplicationData, applicationId]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Job application not found' });
    } else {
      res.status(200).json({ message: 'Job application updated successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete job application by ID
router.delete('/jobapplication/:applicationId', async (req, res) => {
  const applicationId = req.params.applicationId;
  const sql = 'DELETE FROM jobApplications WHERE applicationId = ?';
  try {
    const result = await queryAsync(sql, applicationId);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Job application not found' });
    } else {
      res.status(200).json({ message: 'Job application deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


  module.exports = router;