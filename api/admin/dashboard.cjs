const mongoose = require('mongoose');
const Contact = require('../../backend/express/models/Contact');
const Project = require('../../backend/express/models/Project');

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = async (req, res) => {
  await connectDB();

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const totalProjects = await Project.countDocuments();
    const featuredProjects = await Project.countDocuments({ featured: true });
    const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(10);
    res.json({
      success: true,
      stats: { totalContacts, newContacts, totalProjects, featuredProjects },
      recentContacts
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
