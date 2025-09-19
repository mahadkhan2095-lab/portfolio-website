const mongoose = require('mongoose');
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

  if (req.method === 'GET') {
    try {
      const { featured, category } = req.query;
      let query = {};
      if (featured) query.featured = featured === 'true';
      if (category) query.category = category;
      const projects = await Project.find(query).sort({ createdAt: -1 });
      res.json({ success: true, projects });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      const project = new Project(req.body);
      await project.save();
      res.status(201).json({ success: true, project });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
    return;
  }

  res.status(405).json({ success: false, message: 'Method not allowed' });
};
