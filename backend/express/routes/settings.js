const express = require('express');
const Settings = require('../models/Settings');
const router = express.Router();

// Get all settings
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.find();
    const settingsObj = {};
    settings.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });
    res.json({ success: true, settings: settingsObj });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update settings
router.post('/', async (req, res) => {
  try {
    const updates = req.body;
    
    for (const [key, value] of Object.entries(updates)) {
      await Settings.findOneAndUpdate(
        { key },
        { value },
        { upsert: true, new: true }
      );
    }
    
    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;