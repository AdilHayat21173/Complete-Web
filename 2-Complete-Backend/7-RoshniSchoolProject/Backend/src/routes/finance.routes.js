const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const restrictTo = require("../middlewares/role.middleware");
const financeController = require("../controllers/finance.controller");

const router = express.Router();

// Profit & Loss is admin-only.
router.use(verifyToken, restrictTo("admin"));

router.get("/records", financeController.getRecords);
router.get("/trend", financeController.getTrend); // for the "View Graph" chart
router.post("/record", financeController.saveMonth);

module.exports = router;