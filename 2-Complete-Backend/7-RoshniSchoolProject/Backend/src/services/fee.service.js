// src/services/fee.service.js
const {
  loadWorkbook,
  saveWorkbook,
  stripInternal,
  findSheetNameForKey,
} = require("./excelWorkbook.service");

const FEES_FILE_ID = process.env.GOOGLE_FEES_FILE_ID;

// Must match the Excel header row exactly (spelling included).
const COLS = {
  sNo: "S. No",
  idNo: "ID. No",
  name: "Name of Student",
  father: "Father name",
  class: "Class",
  month: "Month",
  dues: "Dues",
  monthlyFee: "Monthly Fee",
  promotionFee: "Promotion Fee",
  admissionFee: "Admission Fee",
  books: "Books/Copies",
  examFee: "Exame Fee",
  others: "Others",
  total: "Total",
  received: "Recived Fee",
  balance: "Blance",
  receiptNo: "Recpt No",
  date: "Date",
  searchId: "Search ID",
};

function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function computeTotal(row) {
  return (
    num(row[COLS.dues]) +
    num(row[COLS.monthlyFee]) +
    num(row[COLS.promotionFee]) +
    num(row[COLS.admissionFee]) +
    num(row[COLS.books]) +
    num(row[COLS.examFee]) +
    num(row[COLS.others])
  );
}

function nextReceiptNo(rows) {
  let max = 0;
  rows.forEach((r) => {
    const n = parseInt(String(r[COLS.receiptNo]).replace(/\D/g, ""), 10);
    if (!isNaN(n) && n > max) max = n;
  });
  return String(max + 1);
}

function stripWithSheetMonth(row) {
  const cleanRow = stripInternal(row);
  if (row.__sheet) cleanRow[COLS.month] = row.__sheet;
  return cleanRow;
}

function monthKey(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

async function getAllRecords(month) {
  const { rows } = await loadWorkbook(FEES_FILE_ID);
  const target = monthKey(month);
  const filtered = !target || target === "allmonths"
    ? rows
    : rows.filter(
        (row) =>
          monthKey(row.__sheet) === target || monthKey(row[COLS.month]) === target
      );
  return filtered.map(stripWithSheetMonth);
}

async function getMonths() {
  const { wb } = await loadWorkbook(FEES_FILE_ID);
  return wb.SheetNames;
}

async function getSummary(month) {
  const { rows } = await loadWorkbook(FEES_FILE_ID);

  const matchesMonth = (r) => {
    if (!month || month === "All Months") return true;
    const target = monthKey(month);
    return monthKey(r[COLS.month]) === target || monthKey(r.__sheet) === target;
  };

  const filtered = rows.filter(matchesMonth);
  const totalStudents = new Set(filtered.map((r) => r[COLS.idNo])).size;

  let totalFees = 0;
  let paidFees = 0;
  filtered.forEach((r) => {
    totalFees += num(r[COLS.total]) || computeTotal(r);
    paidFees += num(r[COLS.received]);
  });

  return {
    month: month || "All Months",
    totalStudents,
    totalFees,
    paidFees,
    remainingFees: totalFees - paidFees,
  };
}

async function getRecentPayments() {
  const { rows } = await loadWorkbook(FEES_FILE_ID);
  return rows
    .filter((r) => r[COLS.receiptNo] || r[COLS.date])
    .sort((a, b) => new Date(b[COLS.date]) - new Date(a[COLS.date]))
    .slice(0, 10)
    .map(stripWithSheetMonth);
}

async function recordPayment({ idNo, month, amount, date }) {
  const paidNow = num(amount);
  if (!idNo || !month || paidNow <= 0) {
    const err = new Error("idNo, month and a positive amount are required");
    err.status = 400;
    throw err;
  }

  const { wb, rows } = await loadWorkbook(FEES_FILE_ID);
  const idx = rows.findIndex(
    (r) =>
      String(r[COLS.idNo]).trim() === String(idNo).trim() &&
      (String(r[COLS.month]).trim().toLowerCase() === String(month).trim().toLowerCase() ||
        String(r.__sheet).trim().toLowerCase() === String(month).trim().toLowerCase())
  );
  if (idx === -1) {
    const err = new Error(`No record found for ID No ${idNo} in ${month}`);
    err.status = 404;
    throw err;
  }

  const row = rows[idx];
  row[COLS.month] = row.__sheet || month;
  const total = num(row[COLS.total]) || computeTotal(row);
  const newReceived = num(row[COLS.received]) + paidNow;
  const newBalance = total - newReceived; // negative/0 = fully paid (or credit)

  row[COLS.total] = total;
  row[COLS.received] = newReceived;
  row[COLS.balance] = newBalance;
  row[COLS.receiptNo] = nextReceiptNo(rows);
  row[COLS.date] = date || new Date().toLocaleDateString("en-GB");

  rows[idx] = row;
  await saveWorkbook(FEES_FILE_ID, wb, rows, Object.values(COLS));

  return stripWithSheetMonth(row);
}

async function addRecord(body) {
  if (!body.idNo || !body.name) {
    const err = new Error("idNo and name are required");
    err.status = 400;
    throw err;
  }

  const { wb, rows } = await loadWorkbook(FEES_FILE_ID);

  const priorRows = rows.filter((r) => String(r[COLS.idNo]) === String(body.idNo));
  const priorDues =
    priorRows.length > 0
      ? Math.max(0, num(priorRows[priorRows.length - 1][COLS.balance]))
      : 0;

  const newRow = {
    [COLS.sNo]: rows.length + 1,
    [COLS.idNo]: body.idNo,
    [COLS.name]: body.name,
    [COLS.father]: body.father || "",
    [COLS.class]: body.class || "",
    [COLS.month]: body.month || "",
    [COLS.dues]: priorDues,
    [COLS.monthlyFee]: num(body.monthlyFee),
    [COLS.promotionFee]: num(body.promotionFee),
    [COLS.admissionFee]: num(body.admissionFee),
    [COLS.books]: num(body.books),
    [COLS.examFee]: num(body.examFee),
    [COLS.others]: num(body.others),
    [COLS.total]: 0,
    [COLS.received]: 0,
    [COLS.balance]: 0,
    [COLS.receiptNo]: "",
    [COLS.date]: "",
    [COLS.searchId]: "",
    __sheet: findSheetNameForKey(wb, body.month || ""),
  };
  newRow[COLS.total] = computeTotal(newRow);
  newRow[COLS.balance] = newRow[COLS.total];

  rows.push(newRow);
  await saveWorkbook(FEES_FILE_ID, wb, rows, Object.values(COLS));

  return stripInternal(newRow);
}

async function debugSheets() {
  const { wb, rows } = await loadWorkbook(FEES_FILE_ID);
  const counts = {};
  rows.forEach((r) => {
    counts[r.__sheet] = (counts[r.__sheet] || 0) + 1;
  });
  return { sheetNames: wb.SheetNames, rowsPerSheet: counts, totalRows: rows.length };
}

module.exports = {
  getAllRecords,
  getMonths,
  getSummary,
  getRecentPayments,
  recordPayment,
  addRecord,
  debugSheets,
};
