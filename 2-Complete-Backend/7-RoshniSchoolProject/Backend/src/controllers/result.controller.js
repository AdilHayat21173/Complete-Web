const resultService = require("../services/result.service");

async function getRecords(req, res) {
  try {
    res.json(await resultService.getAllRecords());
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function getTerms(req, res) {
  try {
    res.json(await resultService.getTerms());
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function getClasses(req, res) {
  try {
    res.json(await resultService.getClasses());
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function getStudents(req, res) {
  try {
    const { class: className } = req.query;
    if (!className) {
      return res.status(400).json({ message: "?class=<className> is required" });
    }
    res.json(await resultService.getStudents(className));
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
}

// Subjects depend on the class: GET /api/results/subjects?class=1st
async function getSubjects(req, res) {
  try {
    const { class: className, examType } = req.query;
    if (!className) {
      return res.status(400).json({ message: "?class=<className> is required" });
    }
    res.json(resultService.getSubjects(className, examType));
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
}

async function getSummary(req, res) {
  try {
    res.json(
      await resultService.getSummary({
        term: req.query.term,
        month: req.query.month,
        examType: req.query.examType,
        className: req.query.class,
      })
    );
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function addOrUpdateResult(req, res) {
  try {
    const record = await resultService.addOrUpdateResult(req.body);
    res.json({ success: true, record });
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
}

async function debugSheets(req, res) {
  try {
    res.json(await resultService.debugSheets());
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = {
  getRecords,
  getTerms,
  getClasses,
  getStudents,
  getSubjects,
  getSummary,
  addOrUpdateResult,
  debugSheets,
};
