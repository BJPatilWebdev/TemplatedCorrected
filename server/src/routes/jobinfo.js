// jobinfo route module.
const express = require("express");
const router = express.Router();
const {db, queryAsync } = require("../controllers/db");

// Search job info by job title
router.get('/jobInfo/search', async (req, res) => {
  const searchTerm = req.query.jobTitle;
  console.log("/jobInfo/search Filter : " + searchTerm);
  const sql = 'SELECT * FROM jobInfo WHERE jobTitle LIKE ?';

  try {
    const result = await queryAsync(sql, [`%${searchTerm}%`]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get job info with multiple filters
router.get('/jobInfo/multisearch', async (req, res) => {
  let sql = 'SELECT * FROM jobInfo WHERE 1 = 1'; // Start with a base query
  
 // Check for filters in query parameters
  for (const key in req.query) {
    switch (key) {
      case 'jobTitle':
      case 'companyName':
      case 'education':
        sql += ` AND ${key} = '${req.query[key]}'`;
        break;
      case 'minExpectedCtc':
      case 'maxExpectedCtc':
      case 'noticePeriod':
        sql += ` AND ${key} >= ${req.query[key]}`;
        break;
      case 'technicalSkills':
      case 'domain':
        sql += ` AND ${key} LIKE '%${req.query[key]}%'`;
        break;
      default:
        // Handle other query parameters if needed
        break;
    }
  }
  console.log("/jobInfo/multisearch : " + sql);
  try {
    const result = await queryAsync(sql);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create job info
router.post('/jobInfo', async (req, res) => {
  const jobInfoData = req.body;
  console.log("Request Data " + JSON.stringify(req.body));
  const sql = 'INSERT INTO jobInfo SET ?';
  try {
    const result = await queryAsync(sql, jobInfoData);
    res.status(201).json({ message: 'Job info created successfully', jobId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all job info
router.get('/jobInfo', async (req, res) => {
  const sql = 'SELECT * FROM jobInfo';
  try {
    const result = await queryAsync(sql);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get job info by ID
router.get('/jobInfo/:jobId', async (req, res) => {
  const jobId = req.params.jobId;
  console.log("/jobInfo/search Filter : " + jobId);
  const sql = 'SELECT * FROM jobInfo WHERE jobId = ?';
  try {
    const [result] = await queryAsync(sql, jobId);
    if (!result) {
      res.status(404).json({ message: 'Job info not found' });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update job info by ID
router.put('/jobInfo/:jobId', async (req, res) => {
  const jobId = req.params.jobId;
  const updatedJobInfoData = req.body;
  console.log("/jobInfo/search Filter : " + jobId);
  const sql = 'UPDATE jobInfo SET ? WHERE jobId = ?';
  try {
    const result = await queryAsync(sql, [updatedJobInfoData, jobId]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Job info not found' });
    } else {
      res.status(200).json({ message: 'Job info updated successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete job info by ID
router.delete('/jobInfo/:jobId', async (req, res) => {
  const jobId = req.params.jobId;
  console.log("/jobInfo/search Filter : " + jobId);
  const sql = 'DELETE FROM jobInfo WHERE jobId = ?';
  try {
    const result = await queryAsync(sql, jobId);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Job info not found' });
    } else {
      res.status(200).json({ message: 'Job info deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
