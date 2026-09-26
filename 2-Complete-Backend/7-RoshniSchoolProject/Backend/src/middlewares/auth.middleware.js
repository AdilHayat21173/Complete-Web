const jwt = require("jsonwebtoken");

// Verifies the JWT (from cookie, set at login, or an Authorization: Bearer
// header — useful if the frontend ever calls this API from a different
// origin where cookies get blocked) and attaches { id, role } to req.user.
function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const bearerToken = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    const token = req.cookies?.token || bearerToken;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated. Please log in." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

module.exports = verifyToken;
