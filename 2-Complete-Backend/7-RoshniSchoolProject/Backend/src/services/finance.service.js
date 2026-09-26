// src/services/finance.service.js
const { loadWorkbook, saveWorkbook, stripInternal } = require("./excelWorkbook.service");

const FINANCE_FILE_ID = process.env.GOOGLE_FINANCE_FILE_ID;
const SHEET_NAME = "Profit & Loss";

// This file is a NATIVE Google Sheet, not an uploaded .xlsx, so every
// load has to go through the export path.
const LOAD_OPTS = { isGoogleSheet: true };

const COLS = {
  month: "Month",
  admissionFees: "Admission Fees",
  feesReceived: "Total Fees Received",
  totalIncome: "Total Income",
  salary: "Staff/Teacher Salary",
  electricity: "Electricity",
  building: "Building",
  totalExpense: "Total Expense",
  netProfit: "Net Profit",
};

function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

async function getAllRecords() {
  const { rows } = await loadWorkbook(FINANCE_FILE_ID, LOAD_OPTS);
  return rows.map(stripInternal);
}

// Just the fields the "View Graph" line chart needs: month + net profit,
// in sheet order (top to bottom), so the X axis reads left-to-right as
// the months actually appear in the ledger.
async function getProfitTrend() {
  const rows = await getAllRecords();
  return rows.map((r) => ({
    month: r[COLS.month],
    totalIncome: num(r[COLS.totalIncome]),
    totalExpense: num(r[COLS.totalExpense]),
    netProfit: num(r[COLS.netProfit]),
  }));
}

// Adds a new month's row, or updates it if that month already exists.
// Total Income / Total Expense / Net Profit are always recomputed here —
// never trust a client-sent value for those three.
async function addOrUpdateMonth(body) {
  const { month, admissionFees, feesReceived, salary, electricity, building } = body;

  if (!month) {
    const err = new Error("month is required");
    err.status = 400;
    throw err;
  }

  const { wb, rows } = await loadWorkbook(FINANCE_FILE_ID, LOAD_OPTS);

  const idx = rows.findIndex(
    (r) => String(r[COLS.month]).trim().toLowerCase() === String(month).trim().toLowerCase()
  );

  const row = idx !== -1 ? rows[idx] : { __sheet: SHEET_NAME };

  row[COLS.month] = month;
  row[COLS.admissionFees] = admissionFees !== undefined ? num(admissionFees) : num(row[COLS.admissionFees]);
  row[COLS.feesReceived] = feesReceived !== undefined ? num(feesReceived) : num(row[COLS.feesReceived]);
  row[COLS.salary] = salary !== undefined ? num(salary) : num(row[COLS.salary]);
  row[COLS.electricity] = electricity !== undefined ? num(electricity) : num(row[COLS.electricity]);
  row[COLS.building] = building !== undefined ? num(building) : num(row[COLS.building]);

  row[COLS.totalIncome] = row[COLS.admissionFees] + row[COLS.feesReceived];
  row[COLS.totalExpense] = row[COLS.salary] + row[COLS.electricity] + row[COLS.building];
  row[COLS.netProfit] = row[COLS.totalIncome] - row[COLS.totalExpense];

  if (idx !== -1) {
    rows[idx] = row;
  } else {
    rows.push(row);
  }

  await saveWorkbook(FINANCE_FILE_ID, wb, rows, Object.values(COLS));

  return stripInternal(row);
}

module.exports = { getAllRecords, getProfitTrend, addOrUpdateMonth };