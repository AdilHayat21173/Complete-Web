const financeService = require("../services/finance.service");

async function getRecords(req, res) {
  try {
    res.json(await financeService.getAllRecords());
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function getTrend(req, res) {
  try {
    res.json(await financeService.getProfitTrend());
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function saveMonth(req, res) {
  try {
    const record = await financeService.addOrUpdateMonth(req.body);
    res.json({ success: true, record });
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
}

module.exports = { getRecords, getTrend, saveMonth };