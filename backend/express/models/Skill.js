const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['frontend', 'backend', 'database', 'tools', 'ui-ux', 'other'] },
  proficiency: { type: Number, min: 1, max: 100, default: 80 },
  icon: { type: String }, // Icon name or URL
  color: { type: String, default: '#3B82F6' }, // Hex color code
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Skill', skillSchema);