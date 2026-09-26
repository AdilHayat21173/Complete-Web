// src/services/excelWorkbook.service.js
// Generic helpers for a workbook where each tab is one "bucket"
// (a month, in the Fee file; a term, in the Result file). Flattens every
// sheet into one row array on read, and writes changed rows back into
// only the sheets they actually belong to on save.

const xlsx = require("xlsx");
const { downloadWorkbookBufferAuto, uploadFileBuffer } = require("./googleDrive.service");

// Downloads the file (auto-detecting whether it's a native Google Sheet or
// a raw .xlsx — see googleDrive.service.js) and returns { wb, rows }, where
// every row carries a hidden __sheet field remembering which tab it came from.
async function loadWorkbook(fileId) {
  const buffer = await downloadWorkbookBufferAuto(fileId);
  const wb = xlsx.read(buffer, { type: "buffer", cellDates: false });

  let rows = [];
  wb.SheetNames.forEach((sheetName) => {
    const sheet = wb.Sheets[sheetName];
    const sheetRows = xlsx.utils.sheet_to_json(sheet, { defval: "" });
    sheetRows.forEach((r) => {
      r.__sheet = sheetName;
    });
    rows = rows.concat(sheetRows);
  });

  return { wb, rows };
}

// Removes the internal __sheet marker before a row is sent to the client.
function stripInternal(row) {
  const { __sheet, ...rest } = row;
  return rest;
}

// Finds an existing sheet/tab matching `key` case-insensitively, or falls
// back to `key` itself (used when creating a brand-new tab, e.g. a new
// month or a new exam term that doesn't exist in the workbook yet).
function findSheetNameForKey(wb, key) {
  const match = wb.SheetNames.find(
    (s) => s.trim().toLowerCase() === String(key).trim().toLowerCase()
  );
  return match || String(key).trim();
}

// Rebuilds each affected sheet from `rows` (grouped by their __sheet) and
// uploads the whole workbook back to the same Drive file.
// `headerColumns` can be either:
//   - an array (same columns for every sheet — e.g. the Fee System, where
//     every month has identical columns), or
//   - a function (sheetName, sheetRows) => array, when different sheets
//     need different columns (e.g. Results, where each class has its own
//     subject list).
async function saveWorkbook(fileId, wb, rows, headerColumns) {
  const bySheet = {};
  rows.forEach((r) => {
    const sheetName = r.__sheet || wb.SheetNames[0];
    if (!bySheet[sheetName]) bySheet[sheetName] = [];
    bySheet[sheetName].push(stripInternal(r));
  });

  Object.entries(bySheet).forEach(([sheetName, sheetRows]) => {
    const header =
      typeof headerColumns === "function"
        ? headerColumns(sheetName, sheetRows)
        : headerColumns;
    const newSheet = xlsx.utils.json_to_sheet(sheetRows, { header });
    wb.Sheets[sheetName] = newSheet;
    if (!wb.SheetNames.includes(sheetName)) {
      wb.SheetNames.push(sheetName);
    }
  });

  const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
  await uploadFileBuffer(fileId, buffer);
}

module.exports = { loadWorkbook, saveWorkbook, stripInternal, findSheetNameForKey };