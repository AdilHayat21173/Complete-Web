const feeService = require("../services/fee.service");
const resultService = require("../services/result.service");

// One combined summary for the admin Dashboard cards.
async function getSummary(req, res) {
  try {
    const [fees, results] = await Promise.all([
      feeService.getSummary(req.query.month),
      resultService.getSummary({ term: req.query.term, className: req.query.class }),
    ]);
    res.json({ fees, results });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = { getSummary };
