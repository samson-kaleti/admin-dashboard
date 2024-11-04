const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const message = err.name === 'TokenExpiredError' ? 'Token expired' : 'Failed to authenticate token';
      return res.status(403).json({ message });
    }
    // Attach user ID and role to the request object
    req.userId = decoded.id;
    req.userRole = decoded.role; // Corrected: use `req.userRole` instead of `req.role`
    console.log(`User role: ${req.userRole}`); // This should now display the correct role
    next();
  });
}; 


const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Check if the role exists and if it's included in the allowed roles
    if (!req.userRole || !roles.includes(req.userRole)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};

module.exports = { authMiddleware, authorizeRoles };
