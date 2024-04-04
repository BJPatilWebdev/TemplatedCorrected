// jobseekerinfo route module.
const express = require("express");
const router = express.Router();
const {db, queryAsync } = require("../controllers/db");

// Create job seeker info
router.post('/jobseekerinfo', async (req, res) => {
  const jobSeekerInfoData = req.body;
  const sql = 'INSERT INTO jobseekerinfo SET ?';
  try {
    const result = await queryAsync(sql, jobSeekerInfoData);
    res.status(201).json({ message: 'Job seeker info created successfully', jobSeekerId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all job seeker info
router.get('/jobseekerinfo', async (req, res) => {
  const sql = 'SELECT * FROM jobseekerinfo';
  try {
    const result = await queryAsync(sql);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get job seeker info by ID
router.get('/jobseekerinfo/:jobSeekerId', async (req, res) => {
  const jobSeekerId = req.params.jobSeekerId;
  const sql = 'SELECT * FROM jobseekerinfo WHERE jobSeekerId = ?';
  try {
    const [result] = await queryAsync(sql, jobSeekerId);
    if (!result) {
      res.status(404).json({ message: 'Job seeker info not found' });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update job seeker info by ID
router.put('/jobseekerinfo/:jobSeekerId', async (req, res) => {
  const jobSeekerId = req.params.jobSeekerId;
  const updatedJobSeekerInfoData = req.body;
  const sql = 'UPDATE jobseekerinfo SET ? WHERE jobSeekerId = ?';
  try {
    const result = await queryAsync(sql, [updatedJobSeekerInfoData, jobSeekerId]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Job seeker info not found' });
    } else {
      res.status(200).json({ message: 'Job seeker info updated successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete job seeker info by ID
router.delete('/jobseekerinfo/:jobSeekerId', async (req, res) => {
  const jobSeekerId = req.params.jobSeekerId;
  const sql = 'DELETE FROM jobseekerinfo WHERE jobSeekerId = ?';
  try {
    const result = await queryAsync(sql, jobSeekerId);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Job seeker info not found' });
    } else {
      res.status(200).json({ message: 'Job seeker info deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
