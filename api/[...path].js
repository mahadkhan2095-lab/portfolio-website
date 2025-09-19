const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// MongoDB Connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Routes
app.use('/api/contacts', require('../backend/express/routes/contacts'));
app.use('/api/projects', require('../backend/express/routes/projects'));
app.use('/api/skills', require('../backend/express/routes/skills'));
app.use('/api/auth', require('../backend/express/routes/auth'));
app.use('/api/admin', require('../backend/express/routes/admin'));
app.use('/api/analytics', require('../backend/express/routes/analytics'));
app.use('/api/settings', require('../backend/express/routes/settings'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running', timestamp: new Date().toISOString() });
});

// Export for Vercel
module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};