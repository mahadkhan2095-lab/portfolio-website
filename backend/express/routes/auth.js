const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// POST - Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check for demo credentials
    if (email === 'admin@portfolio.com' && password === 'admin123') {
      const token = jwt.sign(
        { userId: 'demo', role: 'admin', isDemo: true },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );
      
      return res.json({
        success: true,
        token,
        user: { id: 'demo', username: 'admin', email: 'admin@portfolio.com', role: 'admin', isDemo: true }
      });
    }
    
    const user = await User.findOne({ email, isActive: true });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    user.lastLogin = new Date();
    await user.save();
    
    res.json({
      success: true,
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST - Register (admin only for now)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = new User({ username, email, password, role });
    await user.save();
    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST - Update admin credentials (for demo users)
router.post('/update-credentials', async (req, res) => {
  try {
    const { currentEmail, currentPassword, newEmail, newPassword, newUsername } = req.body;
    
    // Check if current credentials are demo
    if (currentEmail === 'admin@portfolio.com' && currentPassword === 'admin123') {
      // Create new admin user with new credentials
      const existingUser = await User.findOne({ email: newEmail });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
      
      const newUser = new User({ 
        username: newUsername || 'admin', 
        email: newEmail, 
        password: newPassword, 
        role: 'admin',
        isActive: true
      });
      await newUser.save();
      
      const token = jwt.sign(
        { userId: newUser._id, role: newUser.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );
      
      return res.json({
        success: true,
        message: 'Credentials updated successfully',
        token,
        user: { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role }
      });
    }
    
    res.status(400).json({ success: false, message: 'Invalid current credentials' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;