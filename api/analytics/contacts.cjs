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

  const { period = '30' } = req.query;
  try {
    const days = parseInt(period);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const contactsByDay = await Contact.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    const statusDistribution = await Contact.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json({
      success: true,
      analytics: { contactsByDay, statusDistribution, period }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
