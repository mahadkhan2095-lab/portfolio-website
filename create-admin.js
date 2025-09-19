const mongoose = require('mongoose');
const User = require('./backend/express/models/User');
require('dotenv').config();

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    
    // Admin user data
    const adminData = {
      username: 'admin',
      email: 'admin@portfolio.com',
      password: 'admin123',
      role: 'admin'
    };
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }
    
    // Create admin user
    const admin = new User(adminData);
    await admin.save();
    
    console.log('Admin user created successfully!');
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);
    
  } catch (error) {
    console.error('Error creating admin:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();