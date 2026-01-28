const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { passkey } = req.body;
    if (!passkey) {
      return res.status(400).json({ success: false, message: 'Passkey is required' });
    }

    const ADMIN_PASSKEY = process.env.ADMIN_PASSKEY;
    if (!ADMIN_PASSKEY) {
      return res.status(500).json({ success: false, message: 'Server not configured for admin authentication' });
    }

    if (passkey !== ADMIN_PASSKEY) {
      return res.status(401).json({ success: false, message: 'Invalid passkey' });
    }

    const secret = process.env.ADMIN_JWT_SECRET || ADMIN_PASSKEY;
    const token = jwt.sign({ role: 'admin' }, secret, { expiresIn: '4h' });

    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login error', error: error.message });
  }
};
