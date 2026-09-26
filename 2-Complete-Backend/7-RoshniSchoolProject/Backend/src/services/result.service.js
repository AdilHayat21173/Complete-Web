// src/services/result.service.js
//
// Each CLASS has its own subject list, so a single sheet tab can't mix
// classes with different columns. Instead, each sheet tab is one
// TERM + CLASS combination, e.g. "Final Term - 1st", "Final Term - 6th".
// All rows within one tab are the same class, so they share one set of
// subject columns.

const {
  loadWorkbook,
  saveWorkbook,
  stripInternal,
} = require("./excelWorkbook.service");
const xlsx = require("xlsx");

const RESULTS_FILE_ID = process.env.GOOGLE_RESULTS_FILE_ID;
const STUDENT_ROSTER_FILE_ID = process.env.GOOGLE_STUDENT_ROSTER_FILE_ID;

// ---- Subjects per class -------------------------------------------------
// Edit this to match your school exactly. Class names must match what
// you send from the frontend (case-insensitive, so "1st" and "1ST" both
// work, but the wording itself — "1st" vs "Class 1" — must be consistent).
//
// NOTE: 7th–10th aren't in what you gave me — I've assumed they follow
// the same subjects as 6th for now. Tell me if that's wrong (e.g. Physics/
// Chemistry/Biology/Computer usually appear from 7th–8th onward).
const CLASS_SUBJECTS = {
  Playgroup: ["English", "Urdu", "Math", "Nazira"],
  Nursery: ["English", "Urdu", "Math", "Nazira"],
  KG: ["English", "Urdu", "Math", "Nazira"],
  "1st": ["English", "Urdu", "Math", "Islamiat", "Wafqiyat", "Nazira"],
  "2nd": ["English", "Urdu", "Math", "Islamiat", "Wafqiyat", "Nazira"],
  "3rd": ["English", "Urdu", "Math", "Islamiat", "Wafqiyat", "Nazira"],
  "4th": ["English", "Urdu", "Math", "Islamiat", "Pak Study", "Science"],
  "5th": ["English", "Urdu", "Math", "Islamiat", "Pak Study", "Science"],
  "6th": ["English", "Urdu", "Math", "Islamiat", "Pak Study", "Science"],
  "7th": ["English", "Urdu", "Math", "Islamiat", "Pak Study", "Science"], // assumed, please confirm
  "8th": ["English", "Urdu", "Math", "Islamiat", "Pak Study", "Science"], // assumed, please confirm
  "9th": ["English", "Urdu", "Math", "Islamiat", "Pak Study", "Science"], // assumed, please confirm
  "10th": ["English", "Urdu", "Math", "Islamiat", "Pak Study", "Science"], // assumed, please confirm
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const TERMS = ["First Term", "Second Term", "Third Term", "Final Term"];
const TERM_SHEET = "Term Result";
const MONTHLY_SHEET = "Monthly Test";
const SUBJECT_COLUMNS = ["English", "Urdu", "Math", "Islamiat", "Wafqiyat", "Pak Study", "Science", "Nazira"];
const NURSERY_VIVA_SUBJECTS = ["English", "Urdu", "Math"];

const BASE_COLS = {
  sNo: "S. No",
  idNo: "ID. No",
  name: "Name of Student",
  father: "Father name",
  class: "Class",
  examType: "Exam Type",
  term: "Term",
  month: "Month",
};

const SUMMARY_COLS = {
  obtainedTotal: "Obtained Total",
  grandTotal: "Grand Total",
  percentage: "Percentage",
  grade: "Grade",
  result: "Result",
};

function normalizeClassKey(className) {
  const value = String(className || "").trim();
  const comparable = value.toLowerCase().replace(/[\s._-]/g, "");
  return (
    Object.keys(CLASS_SUBJECTS).find(
      (key) => key.toLowerCase().replace(/[\s._-]/g, "") === comparable
    ) || value
  );
}

// Finds the subject list for a class, matching case-insensitively.
function getSubjectsForClass(className) {
  const target = normalizeClassKey(className).toLowerCase();
  const key = Object.keys(CLASS_SUBJECTS).find(
    (k) => k.toLowerCase() === target
  );
  if (!key) {
    const err = new Error(
      `Unknown class "${className}". Known classes: ${Object.keys(CLASS_SUBJECTS).join(", ")}`
    );
    err.status = 400;
    throw err;
  }
  return CLASS_SUBJECTS[key];
}

function assessmentType(value) {
  return String(value || "").toLowerCase().includes("month") ? MONTHLY_SHEET : TERM_SHEET;
}

function monthFromLegacyTerm(value) {
  const comparable = String(value || "").trim().toLowerCase();
  return MONTHS.find((month) => comparable.startsWith(month.toLowerCase())) || "";
}

function normalizeRow(source) {
  const row = { ...source };
  const legacyMonth = monthFromLegacyTerm(row[BASE_COLS.term]);
  const type = assessmentType(row[BASE_COLS.examType] || (row[BASE_COLS.month] || legacyMonth ? MONTHLY_SHEET : TERM_SHEET));
  const period = type === MONTHLY_SHEET
    ? (row[BASE_COLS.month] || legacyMonth || String(row[BASE_COLS.term] || "").replace(/\s+monthly test$/i, "").trim())
    : String(row[BASE_COLS.term] || "");
  row[BASE_COLS.examType] = type;
  row[BASE_COLS.month] = type === MONTHLY_SHEET ? period : "";
  row[BASE_COLS.term] = type === TERM_SHEET ? (period || "First Term") : "";
  if (row.Wafqiyat === undefined && row.Wafqiama !== undefined) row.Wafqiyat = row.Wafqiama;
  row.__sheet = type === MONTHLY_SHEET ? MONTHLY_SHEET : TERM_SHEET;
  return row;
}

function subjectDefinitions(className, type) {
  const canonicalClass = normalizeClassKey(className);
  const applicable = getSubjectsForClass(canonicalClass).filter(
    (subject) => type !== MONTHLY_SHEET || subject !== "Nazira"
  );
  return applicable.map((name) => ({
    name,
    maxMarks: type === MONTHLY_SHEET || name === "Nazira" ? 50 : 100,
    components: type === TERM_SHEET && ["Playgroup", "Nursery", "KG"].includes(canonicalClass) && NURSERY_VIVA_SUBJECTS.includes(name)
      ? ["Written", "Viva"]
      : [],
  }));
}

function buildHeaderColumns(type) {
  const base = [BASE_COLS.sNo, BASE_COLS.idNo, BASE_COLS.name, BASE_COLS.father, BASE_COLS.class,
    BASE_COLS.examType, type === MONTHLY_SHEET ? BASE_COLS.month : BASE_COLS.term];
  const subjectHeaders = type === MONTHLY_SHEET
    ? SUBJECT_COLUMNS.filter((subject) => subject !== "Nazira")
    : SUBJECT_COLUMNS.flatMap((subject) => NURSERY_VIVA_SUBJECTS.includes(subject)
      ? [`${subject} Written`, `${subject} Viva`, subject]
      : [subject]);
  return [...base, ...subjectHeaders, ...Object.values(SUMMARY_COLS)];
}

function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function gradeFromPercentage(pct) {
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B";
  if (pct >= 60) return "C";
  if (pct >= 50) return "D";
  if (pct >= PASS_PERCENTAGE) return "E";
  return "F";
}

// Computes totals using ONLY the subjects that apply to this row's class.
function computeSummary(row) {
  const type = assessmentType(row[BASE_COLS.examType]);
  const subjects = subjectDefinitions(row[BASE_COLS.class], type);
  const grandTotal = subjects.reduce((total, subject) => total + subject.maxMarks, 0);
  const obtainedTotal = subjects.reduce((sum, subject) => sum + num(row[subject.name]), 0);
  const percentage = grandTotal
    ? Math.round((obtainedTotal / grandTotal) * 10000) / 100
    : 0;

  return {
    obtainedTotal,
    grandTotal,
    percentage,
    grade: gradeFromPercentage(percentage),
    result: percentage >= (type === MONTHLY_SHEET ? 35 : 33) ? "Pass" : "Fail",
  };
}

async function getAllRecords() {
  const { rows } = await loadWorkbook(RESULTS_FILE_ID);
  return rows.map(normalizeRow).map(stripInternal);
}

async function getTerms() {
  const { rows } = await loadWorkbook(RESULTS_FILE_ID);
  return [...new Set(rows.map(normalizeRow).map((row) =>
    row[BASE_COLS.examType] === MONTHLY_SHEET ? row[BASE_COLS.month] : row[BASE_COLS.term]
  ).filter(Boolean))];
}

async function getStudentRoster() {
  const { rows } = await loadWorkbook(STUDENT_ROSTER_FILE_ID);
  return rows.filter((row) => row[BASE_COLS.idNo] && row[BASE_COLS.class]);
}

async function getClasses() {
  const records = await getStudentRoster();
  const classNames = [...new Set(records
    .map((row) => String(row[BASE_COLS.class] || "").trim())
    .filter(Boolean))];
  return classNames.length
    ? classNames
    : Object.keys(CLASS_SUBJECTS);
}

async function getStudents(className) {
  const requestedClass = normalizeClassKey(className).toLowerCase();
  const records = await getStudentRoster();
  const students = new Map();

  records.forEach((row) => {
    if (
      normalizeClassKey(row[BASE_COLS.class]).toLowerCase() !== requestedClass ||
      !row[BASE_COLS.idNo]
    ) return;

    const idNo = String(row[BASE_COLS.idNo]).trim();
    if (!students.has(idNo)) {
      students.set(idNo, {
        idNo,
        name: row[BASE_COLS.name] || "",
        father: row[BASE_COLS.father] || "",
        class: normalizeClassKey(row[BASE_COLS.class]),
      });
    }
  });

  return [...students.values()];
}

function getSubjects(className, type = TERM_SHEET) {
  return subjectDefinitions(className, assessmentType(type));
}

async function getSummary({ term, month, examType, className } = {}) {
  const { rows } = await loadWorkbook(RESULTS_FILE_ID);
  const type = assessmentType(examType);
  const periodFilter = type === MONTHLY_SHEET ? month : term;
  const filtered = rows.map(normalizeRow).filter((r) => {
    const matchesType = !examType || r[BASE_COLS.examType] === type;
    const period = type === MONTHLY_SHEET ? r[BASE_COLS.month] : r[BASE_COLS.term];
    const matchesPeriod = !periodFilter || periodFilter.startsWith("All ") ||
      String(period).trim().toLowerCase() === String(periodFilter).trim().toLowerCase();
    const matchesClass =
      !className ||
      className === "All Classes" ||
      normalizeClassKey(r[BASE_COLS.class]).toLowerCase() ===
        normalizeClassKey(className).toLowerCase();
    return matchesType && matchesPeriod && matchesClass;
  });

  const totalStudents = filtered.length;
  const passed = filtered.filter((r) => r[SUMMARY_COLS.result] === "Pass").length;
  const avgPercentage =
    totalStudents > 0
      ? Math.round(
          (filtered.reduce((sum, r) => sum + num(r[SUMMARY_COLS.percentage]), 0) /
            totalStudents) *
            100
        ) / 100
      : 0;

  return {
    term: term || "All Terms",
    month: month || "All Months",
    examType: examType || "All Types",
    class: className || "All Classes",
    totalStudents,
    passed,
    failed: totalStudents - passed,
    avgPercentage,
  };
}

// Adds a new result row, or updates the existing one for the same
// student + term + class if it already exists.
async function addOrUpdateResult(body) {
  const { idNo, name, father, class: className, marks = {} } = body;
  const type = assessmentType(body.examType);
  const period = String(type === MONTHLY_SHEET ? body.month : body.term || "").trim();
  if (!idNo || !name || !period || !className) {
    const err = new Error("idNo, name, class and the selected term or month are required");
    err.status = 400;
    throw err;
  }

  const canonicalClassName = normalizeClassKey(className);
  const subjects = subjectDefinitions(canonicalClassName, type);
  const allowedPeriods = type === MONTHLY_SHEET ? MONTHS : TERMS;
  if (!allowedPeriods.some((allowed) => allowed.toLowerCase() === period.toLowerCase())) {
    const err = new Error(`Invalid ${type === MONTHLY_SHEET ? "month" : "term"}`);
    err.status = 400;
    throw err;
  }

  const { wb, rows } = await loadWorkbook(RESULTS_FILE_ID);
  const normalizedRows = rows.map(normalizeRow);
  const idx = normalizedRows.findIndex((row) =>
    String(row[BASE_COLS.idNo]).trim() === String(idNo).trim() &&
    row[BASE_COLS.examType] === type &&
    String(type === MONTHLY_SHEET ? row[BASE_COLS.month] : row[BASE_COLS.term]).trim().toLowerCase() === period.toLowerCase() &&
    normalizeClassKey(row[BASE_COLS.class]).toLowerCase() === canonicalClassName.toLowerCase()
  );
  const row = idx >= 0 ? normalizedRows[idx] : {
    [BASE_COLS.sNo]: normalizedRows.length + 1,
    [BASE_COLS.idNo]: idNo,
    [BASE_COLS.name]: name,
    [BASE_COLS.father]: father || "",
    [BASE_COLS.class]: canonicalClassName,
    [BASE_COLS.examType]: type,
    [BASE_COLS.term]: type === TERM_SHEET ? period : "",
    [BASE_COLS.month]: type === MONTHLY_SHEET ? period : "",
  };

  row[BASE_COLS.name] = name;
  row[BASE_COLS.father] = father || row[BASE_COLS.father] || "";
  row[BASE_COLS.class] = canonicalClassName;
  row[BASE_COLS.examType] = type;
  row[BASE_COLS.term] = type === TERM_SHEET ? period : "";
  row[BASE_COLS.month] = type === MONTHLY_SHEET ? period : "";
  row.__sheet = type === MONTHLY_SHEET ? MONTHLY_SHEET : TERM_SHEET;

  const applicable = new Map(subjects.map((subject) => [subject.name, subject]));
  SUBJECT_COLUMNS.forEach((subject) => {
    const definition = applicable.get(subject);
    if (!definition) {
      row[subject] = 0;
      return;
    }
    if (definition.components.length) {
      definition.components.forEach((component) => {
        const key = `${subject}${component}`;
        const max = definition.maxMarks / definition.components.length;
        const value = marks[key] !== undefined
          ? Number(marks[key])
          : marks[subject] !== undefined
            ? Number(marks[subject]) / definition.components.length
            : Number(row[`${subject} ${component}`] ?? row[key] ?? 0);
        if (!Number.isFinite(value) || value < 0 || value > max) {
          const err = new Error(`${key} must be between 0 and ${max}`);
          err.status = 400;
          throw err;
        }
        row[key] = value;
      });
      row[subject] = definition.components.reduce((total, component) => total + num(row[`${subject}${component}`]), 0);
    } else {
      const value = marks[subject] !== undefined ? Number(marks[subject]) : Number(row[subject] || 0);
      if (!Number.isFinite(value) || value < 0 || value > definition.maxMarks) {
        const err = new Error(`${subject} must be between 0 and ${definition.maxMarks}`);
        err.status = 400;
        throw err;
      }
      row[subject] = value;
    }
  });

  const summary = computeSummary(row);
  row[SUMMARY_COLS.obtainedTotal] = summary.obtainedTotal;
  row[SUMMARY_COLS.grandTotal] = summary.grandTotal;
  row[SUMMARY_COLS.percentage] = summary.percentage;
  row[SUMMARY_COLS.grade] = summary.grade;
  row[SUMMARY_COLS.result] = summary.result;
  if (idx >= 0) normalizedRows[idx] = row;
  else normalizedRows.push(row);

  wb.SheetNames = [TERM_SHEET, MONTHLY_SHEET];
  wb.Sheets = {
    [TERM_SHEET]: xlsx.utils.aoa_to_sheet([buildHeaderColumns(TERM_SHEET)]),
    [MONTHLY_SHEET]: xlsx.utils.aoa_to_sheet([buildHeaderColumns(MONTHLY_SHEET)]),
  };
  const workbookRows = normalizedRows.map((result) => {
    const headers = buildHeaderColumns(result.__sheet === MONTHLY_SHEET ? MONTHLY_SHEET : TERM_SHEET);
    return {
      ...Object.fromEntries(headers.map((header) => {
        const componentKey = header.replace(/ (Written|Viva)$/, "$1");
        return [header, result[componentKey] ?? result[header] ?? ""];
      })),
      __sheet: result.__sheet,
    };
  });
  await saveWorkbook(RESULTS_FILE_ID, wb, workbookRows, (sheetName) =>
    buildHeaderColumns(sheetName === MONTHLY_SHEET ? MONTHLY_SHEET : TERM_SHEET)
  );

  return stripInternal(row);
}

async function debugSheets() {
  const { wb, rows } = await loadWorkbook(RESULTS_FILE_ID);
  const counts = {};
  rows.forEach((r) => {
    counts[r.__sheet] = (counts[r.__sheet] || 0) + 1;
  });
  return { sheetNames: wb.SheetNames, rowsPerSheet: counts, totalRows: rows.length };
}

module.exports = {
  CLASS_SUBJECTS,
  MONTHS,
  TERMS,
  getAllRecords,
  getTerms,
  getClasses,
  getStudents,
  getSubjects,
  getSummary,
  addOrUpdateResult,
  debugSheets,
};
