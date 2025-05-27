// middleware/role.js
// Middleware to restrict actions based on user role

export function requireRole(roles = []) {
  return function (req, res, next) {
    // Example: req.user.role is set by authentication middleware (JWT/session)
    // For demo, allow role via header or fallback to 'doctor'
    const userRole = req.headers['x-user-role'] || (req.user && req.user.role) || 'doctor';
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
    }
    next();
  };
}
