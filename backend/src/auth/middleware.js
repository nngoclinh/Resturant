const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token,  process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
      const userRole = req.user.role; // Extracted from the token
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Access denied: this account don't have permissions." });
      }
      next();
    };
  }
module.exports = {
    authenticateToken,
    authorizeRoles,
}