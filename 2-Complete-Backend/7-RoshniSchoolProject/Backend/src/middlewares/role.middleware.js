// Usage: router.use(verifyToken, restrictTo("admin"))
// or restrictTo("admin", "teacher") to allow either role.
function restrictTo(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. This requires the role: ${allowedRoles.join(" or ")}.`,
      });
    }
    next();
  };
}

module.exports = restrictTo;
