const mongoose = require('mongoose');
const Skill = require('../../../backend/express/models/Skill');

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

  if (method === 'PUT') {
    try {
      const skill = await Skill.findByIdAndUpdate(
        id,
        { ...body },
        { new: true }
      );
      res.json({ success: true, skill });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
    return;
  }

  if (method === 'DELETE') {
    try {
      const skill = await Skill.findByIdAndDelete(id);
      if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
      res.json({ success: true, message: 'Skill deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
    return;
  }

  res.status(405).json({ success: false, message: 'Method not allowed' });
};
