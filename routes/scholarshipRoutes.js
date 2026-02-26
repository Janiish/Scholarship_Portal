const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');

// POST /api/apply - Create a new scholarship application
router.post('/apply', async (req, res) => {
  try {
    const application = await Scholarship.create(req.body);
    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/status/:email - Fetch all applications for a student
router.get('/status/:email', async (req, res) => {
  try {
    const applications = await Scholarship.find({ email: req.params.email });
    if (!applications.length) {
      return res.status(404).json({ message: 'No applications found for this email' });
    }
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/applications - Fetch all applications (admin)
router.get('/admin/applications', async (req, res) => {
  try {
    const applications = await Scholarship.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/delete/:id - Delete an application
router.delete('/admin/delete/:id', async (req, res) => {
  try {
    const application = await Scholarship.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/admin/update/:id - Update application status
router.patch('/admin/update/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Scholarship.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Status updated successfully', application });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
