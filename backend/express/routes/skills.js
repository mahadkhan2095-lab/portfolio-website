const express = require('express');
const Skill = require('../models/Skill');
const router = express.Router();

// GET - Get all skills
router.get('/', async (req, res) => {
  try {
    const { category, active } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (active !== undefined) query.isActive = active === 'true';
    
    const skills = await Skill.find(query).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, skills });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Get single skill
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, skill });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST - Create new skill
router.post('/', async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json({ success: true, skill });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT - Update skill
router.put('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, skill });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE - Delete skill
router.delete('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;