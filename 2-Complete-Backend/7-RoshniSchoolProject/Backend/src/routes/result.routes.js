const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const restrictTo = require("../middlewares/role.middleware");
const resultController = require("../controllers/result.controller");

const router = express.Router();

// Result System: admin AND teacher can both view and add/edit records.
router.use(verifyToken, restrictTo("admin", "teacher"));

router.get("/records", resultController.getRecords);
router.get("/terms", resultController.getTerms);
router.get("/classes", resultController.getClasses);
router.get("/students", resultController.getStudents); // ?class=Nursery required
router.get("/subjects", resultController.getSubjects); // ?class=1st required
router.get("/summary", resultController.getSummary);
router.post("/record", resultController.addOrUpdateResult); // add or update (upsert by ID No + Term + Class)
router.get("/debug/sheets", resultController.debugSheets);

module.exports = router;
