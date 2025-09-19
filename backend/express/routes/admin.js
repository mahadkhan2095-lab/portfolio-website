const express = require('express');
const Contact = require('../models/Contact');
const Project = require('../models/Project');
const User = require('../models/User');
const router = express.Router();

// GET - Dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const totalProjects = await Project.countDocuments();
    const featuredProjects = await Project.countDocuments({ featured: true });
    
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject message createdAt status');
    
    res.json({
      success: true,
      stats: {
        totalContacts,
        newContacts,
        totalProjects,
        featuredProjects
      },
      recentContacts
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - All contacts with pagination
router.get('/contacts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Contact.countDocuments();
    
    res.json({
      success: true,
      contacts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;