const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// POST - Create new contact
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    console.log('Received contact data:', { name, email, subject, message });
    
    const contact = new Contact({ name, email, subject, message });
    const savedContact = await contact.save();
    console.log('Saved contact:', savedContact);
    
    // Send email notification (integrate with existing Web3Forms or nodemailer)
    res.status(201).json({ success: true, message: 'Contact saved successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Get all contacts (admin only)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT - Update contact status
router.put('/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, notes, ...(status === 'replied' && { repliedAt: new Date() }) },
      { new: true }
    );
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE - Delete contact
router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;