const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// GET - Get all projects
router.get('/', async (req, res) => {
  try {
    const { featured, category } = req.query;
    let query = {};
    
    if (featured) query.featured = featured === 'true';
    if (category) query.category = category;
    
    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST - Create new project (admin only)
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT - Update project (admin only)
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE - Delete project (admin only)
router.delete('/:id', async (req, res) => {
  try {
    console.log('DELETE request received for project ID:', req.params.id);
    const project = await Project.findByIdAndDelete(req.params.id);
    console.log('Project found and deleted:', project);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.log('Error in delete route:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;