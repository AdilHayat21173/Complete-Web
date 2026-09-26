const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  listUsers,
  updateUserRole,
} = require("../controllers/auth.controller");

const verifyToken = require("../middlewares/auth.middleware");
const restrictTo = require("../middlewares/role.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/me", verifyToken, getMe);

// Admin-only user management (promote/demote teacher <-> admin)
router.get("/users", verifyToken, restrictTo("admin"), listUsers);
router.patch("/users/:id/role", verifyToken, restrictTo("admin"), updateUserRole);

module.exports = router;