const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  images: [{ type: String }],
  liveUrl: { type: String },
  githubUrl: { type: String },
  featured: { type: Boolean, default: false },
  category: { type: String, enum: ['web', 'mobile', 'ai', 'other'], default: 'web' },
  status: { type: String, enum: ['completed', 'in-progress', 'planned'], default: 'completed' },
  features: [{
    title: { type: String },
    description: { type: String },
    icon: { type: String },
    color: { type: String }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);