const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const restrictTo = require("../middlewares/role.middleware");
const dashboardController = require("../controllers/dashboard.controller");

const router = express.Router();

// Dashboard (combined fees + results overview) is admin-only.
router.use(verifyToken, restrictTo("admin"));

router.get("/summary", dashboardController.getSummary);

module.exports = router;
