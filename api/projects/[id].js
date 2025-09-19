const mongoose = require('mongoose');
const Project = require('../../../backend/express/models/Project');

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = async (req, res) => {
  await connectDB();

  const {
    query: { id },
    method,
    body
  } = req;

  if (method === 'GET') {
    try {
      const project = await Project.findById(id);
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
      res.json({ success: true, project });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
    return;
  }

  if (method === 'PUT') {
    try {
      const project = await Project.findByIdAndUpdate(
        id,
        { ...body, updatedAt: new Date() },
        { new: true }
      );
      res.json({ success: true, project });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
    return;
  }

  if (method === 'DELETE') {
    try {
      const project = await Project.findByIdAndDelete(id);
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
      res.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
    return;
  }

  res.status(405).json({ success: false, message: 'Method not allowed' });
};
