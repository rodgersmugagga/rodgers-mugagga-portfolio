const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // First allow Bearer token (JWT) authentication
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const secret = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSKEY;
    if (!secret) {
      return res.status(500).json({ success: false, message: 'Server not configured for admin auth' });
    }
    try {
      jwt.verify(token, secret);
      return next();
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
  }

  // Fallback to legacy x-admin-passkey header (for backward compatibility)
  const passkey = req.headers['x-admin-passkey'];
  if (!passkey || passkey !== process.env.ADMIN_PASSKEY) {
    return res.status(401).json({ 
      success: false,
      message: 'Invalid passkey, authorization denied'
    });
  }

  next();
};
