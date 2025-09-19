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

  if (req.method === 'GET') {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.json({ success: true, contacts });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      const contact = new Contact(req.body);
      await contact.save();
      res.status(201).json({ success: true, message: 'Contact created', contact });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
    return;
  }

  res.status(405).json({ success: false, message: 'Method not allowed' });
};
