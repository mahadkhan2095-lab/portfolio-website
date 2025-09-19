const mongoose = require('mongoose');
const Contact = require('../../backend/express/models/Contact');

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = async (req, res) => {
  await connectDB();

  const { page = 1, limit = 10 } = req.query;
  try {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const contacts = await Contact.find().sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
    const total = await Contact.countDocuments();
    res.json({
      success: true,
      contacts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
