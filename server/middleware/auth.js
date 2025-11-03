module.exports = (req, res, next) => {
  const passkey = req.headers["x-admin-passkey"];
  
  if (!passkey || passkey !== process.env.ADMIN_PASSKEY) {
    return res.status(401).json({ 
      success: false,
      message: "Invalid passkey, authorization denied" 
    });
  }

  next();
};
