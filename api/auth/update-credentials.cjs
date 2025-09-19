const mongoose = require('mongoose');
const User = require('../../backend/express/models/User');
const jwt = require('jsonwebtoken');

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = async (req, res) => {
  await connectDB();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { currentEmail, currentPassword, newEmail, newPassword, newUsername } = req.body;
    if (currentEmail === 'admin@portfolio.com' && currentPassword === 'admin123') {
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
};
