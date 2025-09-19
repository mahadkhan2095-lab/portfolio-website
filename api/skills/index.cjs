const mongoose = require('mongoose');
const Skill = require('../../backend/express/models/Skill');

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
      const { category, active } = req.query;
      let query = {};
      if (category) query.category = category;
      if (active !== undefined) query.isActive = active === 'true';
      const skills = await Skill.find(query).sort({ order: 1 });
      res.json({ success: true, skills });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      const skill = new Skill(req.body);
      await skill.save();
      res.status(201).json({ success: true, skill });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
    return;
  }

  res.status(405).json({ success: false, message: 'Method not allowed' });
};
