const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    
    // Check for demo credentials
    if (email === 'admin@portfolio.com' && password === 'admin123') {
      const token = jwt.sign(
        { userId: 'demo', role: 'admin', isDemo: true },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );
      
      return res.json({
        success: true,
        token,
        user: { id: 'demo', username: 'admin', email: 'admin@portfolio.com', role: 'admin', isDemo: true }
      });
    }
    
    // For now, only demo credentials work
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};