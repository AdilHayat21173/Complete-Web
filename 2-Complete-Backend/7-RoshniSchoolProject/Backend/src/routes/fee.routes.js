const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const restrictTo = require("../middlewares/role.middleware");
const feeController = require("../controllers/fee.controller");

const router = express.Router();

// Fee System is admin-only.
router.use(verifyToken, restrictTo("admin"));

router.get("/records", feeController.getRecords);
router.get("/months", feeController.getMonths);
router.get("/summary", feeController.getSummary);
router.get("/recent-payments", feeController.getRecentPayments);
router.post("/payment", feeController.makePayment);
router.post("/records", feeController.addRecord);
router.get("/debug/sheets", feeController.debugSheets);

module.exports = router;
