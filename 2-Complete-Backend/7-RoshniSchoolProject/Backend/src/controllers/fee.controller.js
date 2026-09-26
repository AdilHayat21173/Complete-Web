const feeService = require("../services/fee.service");

async function getRecords(req, res) {
  try {
    res.json(await feeService.getAllRecords(req.query.month));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function getMonths(req, res) {
  try {
    res.json(await feeService.getMonths());
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function getSummary(req, res) {
  try {
    res.json(await feeService.getSummary(req.query.month));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function getRecentPayments(req, res) {
  try {
    res.json(await feeService.getRecentPayments());
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function makePayment(req, res) {
  try {
    const record = await feeService.recordPayment(req.body);
    res.json({ success: true, record });
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
}

async function addRecord(req, res) {
  try {
    const record = await feeService.addRecord(req.body);
    res.json({ success: true, record });
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
}

async function debugSheets(req, res) {
  try {
    res.json(await feeService.debugSheets());
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = {
  getRecords,
  getMonths,
  getSummary,
  getRecentPayments,
  makePayment,
  addRecord,
  debugSheets,
};
