// backend/middleware/adminMiddleware.js
module.exports = function (req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied — Admin only" });
  }
  next();
};
