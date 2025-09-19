const mongoose = require('mongoose');
const Contact = require('../../../backend/express/models/Contact');

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
      const contact = await Contact.findByIdAndUpdate(
        id,
        { ...body },
        { new: true }
      );
      res.json({ success: true, contact });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
    return;
  }

  if (method === 'DELETE') {
    try {
      const contact = await Contact.findByIdAndDelete(id);
      if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
      res.json({ success: true, message: 'Contact deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
    return;
  }

  res.status(405).json({ success: false, message: 'Method not allowed' });
};
