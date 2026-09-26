// src/pages/ResultSystem.jsx
import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import {
  getResultRecords,
  getClasses,
  getStudentsForClass,
  getSubjectsForClass,
  saveResult,
  getResultSummary,
} from "../api/result.api";

const EMPTY_FORM = {
  idNo: "",
  name: "",
  father: "",
  class: "",
  examType: "Term Result",
  term: "First Term",
  month: "January",
  marks: {},
};

const TERMS = ["First Term", "Second Term", "Third Term", "Final Term"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const SUBJECT_COLUMNS = ["English", "Urdu", "Math", "Islamiat", "Wafqiyat", "Pak Study", "Science", "Nazira"];

function normalizeClassName(value) {
  return String(value || "").trim().toLowerCase().replace(/[\s._-]/g, "");
}

export default function ResultSystem() {
  const [records, setRecords] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // filters for the table
  const [filterExamType, setFilterExamType] = useState("Term Result");
  const [filterPeriod, setFilterPeriod] = useState("All Terms");
  const [filterClass, setFilterClass] = useState("All Classes");
  const [summary, setSummary] = useState(null);

  // add/edit form
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [subjectsForForm, setSubjectsForForm] = useState([]);
  const [studentsForForm, setStudentsForForm] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const loadAll = async () => {
    try {
      setLoading(true);
      const [r, c] = await Promise.all([getResultRecords(), getClasses()]);
      setRecords(r);
      setClasses(c);
      setError("");
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const s = await getResultSummary({
          examType: filterExamType,
          term: filterExamType === "Term Result" && filterPeriod !== "All Terms" ? filterPeriod : undefined,
          month: filterExamType === "Monthly Test" && filterPeriod !== "All Months" ? filterPeriod : undefined,
          className: filterClass,
        });
        setSummary(s);
      } catch {
        // non-fatal — table below still shows raw rows
      }
    })();
  }, [filterExamType, filterPeriod, filterClass]);

  useEffect(() => {
    setStudentsForForm([]);
    if (!form.class) {
      return;
    }

    let active = true;
    setStudentsLoading(true);
    getStudentsForClass(form.class)
      .then((students) => {
        if (active) setStudentsForForm(students);
      })
      .catch((e) => {
        if (active) setFormError(e.response?.data?.message || e.message);
      })
      .finally(() => {
        if (active) setStudentsLoading(false);
      });

    return () => { active = false; };
  }, [form.class]);

  // When the class in the form changes, fetch that class's subject list
  // and reset the marks object to match.
  useEffect(() => {
    if (!form.class) {
      setSubjectsForForm([]);
      return;
    }
    getSubjectsForClass(form.class, form.examType)
      .then((subjects) => {
        setSubjectsForForm(subjects);
        setForm((f) => ({
          ...f,
          marks: Object.fromEntries(subjects.flatMap((subject) =>
            subject.components.length
              ? subject.components.map((component) => [`${subject.name}${component}`, f.marks[`${subject.name}${component}`] ?? ""])
              : [[subject.name, f.marks[subject.name] ?? ""]]
          )),
        }));
      })
      .catch((e) => setFormError(e.response?.data?.message || e.message));
  }, [form.class, form.examType]);

  const filteredRecords = records.filter((r) => {
    const type = r["Exam Type"] || (MONTHS.includes(r["Month"]) ? "Monthly Test" : "Term Result");
    const matchesType = type === filterExamType;
    const period = filterExamType === "Monthly Test" ? (r["Month"] || r["Term"]) : r["Term"];
    const matchesPeriod = filterPeriod.startsWith("All ") || period === filterPeriod;
    const matchesClass =
      filterClass === "All Classes" ||
      normalizeClassName(r["Class"]) === normalizeClassName(filterClass);
    return matchesType && matchesPeriod && matchesClass;
  });

  const openNewForm = () => {
    setForm(EMPTY_FORM);
    setSubjectsForForm([]);
    setStudentsForForm([]);
    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (row) => {
    setForm({
      idNo: row["ID. No"],
      name: row["Name of Student"],
      father: row["Father name"],
      class: row["Class"],
      examType: row["Exam Type"] || (MONTHS.includes(row["Month"]) ? "Monthly Test" : "Term Result"),
      term: row["Term"],
      month: row["Month"],
      marks: {}, // filled in by the class-subjects effect once class is set
    });
    setFormError("");
    setShowForm(true);
  };

  // Once subjectsForForm is known (after editing an existing row), pull the
  // actual marks for those subjects out of the row being edited.
  useEffect(() => {
    if (!showForm || subjectsForForm.length === 0) return;
    const existing = records.find(
      (r) =>
        String(r["ID. No"]) === String(form.idNo) &&
        (r["Exam Type"] || "Term Result") === form.examType &&
        (form.examType === "Monthly Test" ? (r["Month"] || r["Term"]) === form.month : r["Term"] === form.term) &&
        normalizeClassName(r["Class"]) === normalizeClassName(form.class)
    );
    if (existing) {
      setForm((f) => ({
        ...f,
        marks: Object.fromEntries(subjectsForForm.flatMap((subject) =>
          subject.components.length
            ? subject.components.map((component) => {
                const key = `${subject.name}${component}`;
                const stored = existing[`${subject.name} ${component}`];
                return [key, stored !== undefined ? stored : Number(existing[subject.name] || 0) / 2];
              })
            : [[subject.name, existing[subject.name] !== undefined ? existing[subject.name] : ""]]
        )),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectsForForm]);

  const submitForm = async (e) => {
    e.preventDefault();
    setFormError("");
    const period = form.examType === "Monthly Test" ? form.month : form.term;
    if (!form.idNo || !form.name || !form.class || !period) {
      setFormError("ID No, Name, Class and period are all required.");
      return;
    }
    try {
      setSaving(true);
      await saveResult({
        idNo: form.idNo,
        name: form.name,
        father: form.father,
        class: form.class,
        examType: form.examType,
        term: form.term,
        month: form.month,
        marks: form.marks,
      });
      setShowForm(false);
      await loadAll();
    } catch (e) {
      setFormError(e.response?.data?.message || e.message);
    } finally {
      setSaving(false);
    }
  };

  const subjectColumns = useMemo(
    () => SUBJECT_COLUMNS.filter((subject) => filterExamType !== "Monthly Test" || subject !== "Nazira"),
    [filterExamType]
  );
  const periodOptions = filterExamType === "Monthly Test" ? MONTHS : TERMS;
  const allPeriodLabel = filterExamType === "Monthly Test" ? "All Months" : "All Terms";

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#F8F5E9]">Result System</h2>
          <p className="text-[#eee8d8] mt-1">Manage student exam results</p>
        </div>
        <button
          onClick={openNewForm}
          className="bg-[#FF6500] hover:bg-[#e85b00] text-white font-semibold px-5 py-3 rounded-lg transition shadow"
        >
          + Add / Update Result
        </button>
      </div>

      {error && <div className="mb-6 bg-[#fddede] text-[#8a1f1f] rounded-lg p-4">{error}</div>}

      {/* Filters */}
      <div className="bg-[#F8F5E9] rounded-xl p-5 shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filterExamType}
            onChange={(e) => {
              const type = e.target.value;
              setFilterExamType(type);
              setFilterPeriod(type === "Monthly Test" ? "All Months" : "All Terms");
            }}
            className="px-4 py-3 rounded-lg border border-[#d5ceb9] bg-white outline-none focus:ring-2 focus:ring-[#FF6500]"
          >
            <option value="Term Result">Term Result</option>
            <option value="Monthly Test">Monthly Test</option>
          </select>
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="px-4 py-3 rounded-lg border border-[#d5ceb9] bg-white outline-none focus:ring-2 focus:ring-[#FF6500]"
          >
            <option>{allPeriodLabel}</option>
            {periodOptions.map((period) => <option key={period}>{period}</option>)}
          </select>
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-4 py-3 rounded-lg border border-[#d5ceb9] bg-white outline-none focus:ring-2 focus:ring-[#FF6500]"
          >
            <option>All Classes</option>
            {classes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <SummaryCard label="Students" value={summary.totalStudents} />
          <SummaryCard label="Passed" value={summary.passed} />
          <SummaryCard label="Failed" value={summary.failed} accent />
          <SummaryCard label="Average %" value={`${summary.avgPercentage}%`} />
        </div>
      )}

      {/* Table */}
      <div className="bg-[#F8F5E9] rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-[#ddd6c2]">
          <h3 className="text-xl font-bold text-[#5A5034]">Results</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#eee9d9]">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">ID No</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Student</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Father Name</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Class</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">{filterExamType === "Monthly Test" ? "Month" : "Term"}</th>
                {subjectColumns.map((s) => (
                  <th key={s} className="px-4 py-3 text-left text-sm text-[#5A5034]">
                    {s}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Obtained</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Grand Total</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">%</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Grade</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Result</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={subjectColumns.length + 11} className="px-4 py-6 text-center text-[#71694f]">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={subjectColumns.length + 11} className="px-4 py-6 text-center text-[#71694f]">
                    No results match your filters.
                  </td>
                </tr>
              )}
              {filteredRecords.map((r, i) => (
                <tr key={i} className="border-b border-[#e4dfd2]">
                  <td className="px-4 py-3 text-[#71694f]">{r["ID. No"]}</td>
                  <td className="px-4 py-3 font-medium text-[#5A5034]">{r["Name of Student"]}</td>
                  <td className="px-4 py-3 text-[#71694f]">{r["Father name"]}</td>
                  <td className="px-4 py-3 text-[#71694f]">{r["Class"]}</td>
                  <td className="px-4 py-3 text-[#71694f]">{filterExamType === "Monthly Test" ? (r["Month"] || r["Term"]) : r["Term"]}</td>
                  {subjectColumns.map((s) => (
                    <td key={s} className="px-4 py-3 text-[#5A5034]">
                      {r[s] ?? 0}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-[#5A5034]">{r["Obtained Total"] ?? 0}</td>
                  <td className="px-4 py-3 text-[#5A5034]">{r["Grand Total"] ?? 0}</td>
                  <td className="px-4 py-3 text-[#5A5034]">{r["Percentage"]}</td>
                  <td className="px-4 py-3 text-[#5A5034]">{r["Grade"]}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs text-white ${
                        r["Result"] === "Pass" ? "bg-[#5A5034]" : "bg-[#FF6500]"
                      }`}
                    >
                      {r["Result"]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openEditForm(r)}
                      className="bg-[#5A5034] hover:bg-[#4a4229] text-white text-xs font-semibold px-3 py-2 rounded-lg transition"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <form
            onSubmit={submitForm}
            className="my-4 max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-xl bg-[#F8F5E9] p-4 shadow-lg sm:my-8 sm:p-6"
          >
            <h3 className="text-xl font-bold text-[#5A5034] mb-4">Add / Update Result</h3>

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Class">
                <select
                  value={form.class}
                  onChange={(e) => setForm({
                    ...form,
                    class: e.target.value,
                    idNo: "",
                    name: "",
                    father: "",
                  })}
                  className="input"
                >
                  <option value="">Select class</option>
                  {classes.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Student">
                <select
                  value={form.idNo}
                  disabled={!form.class || studentsLoading}
                  onChange={(e) => {
                    const student = studentsForForm.find((item) => String(item.idNo) === e.target.value);
                    setForm({
                      ...form,
                      idNo: student?.idNo || "",
                      name: student?.name || "",
                      father: student?.father || "",
                    });
                  }}
                  className="input"
                >
                  <option value="">{studentsLoading ? "Loading students…" : "Select student"}</option>
                  {form.idNo && !studentsForForm.some((student) => String(student.idNo) === String(form.idNo)) && (
                    <option value={form.idNo}>{form.name || form.idNo}</option>
                  )}
                  {studentsForForm.map((student) => (
                    <option key={student.idNo} value={student.idNo}>{student.name} ({student.idNo})</option>
                  ))}
                </select>
              </Field>
              <Field label="ID No">
                <input value={form.idNo} readOnly className="input" />
              </Field>
              <Field label="Father Name">
                <input value={form.father} readOnly className="input" />
              </Field>
              <Field label="Name">
                <input value={form.name} readOnly className="input" />
              </Field>
              <Field label="Exam Type">
                <select
                  value={form.examType}
                  onChange={(e) => setForm({
                    ...form,
                    examType: e.target.value,
                    term: "First Term",
                    month: "January",
                    marks: {},
                  })}
                  className="input"
                >
                  <option value="Term Result">Term Result</option>
                  <option value="Monthly Test">Monthly Test</option>
                </select>
              </Field>
              <Field label={form.examType === "Monthly Test" ? "Month" : "Term"}>
                <select
                  value={form.examType === "Monthly Test" ? form.month : form.term}
                  onChange={(e) => setForm({
                    ...form,
                    [form.examType === "Monthly Test" ? "month" : "term"]: e.target.value,
                  })}
                  className="input"
                >
                  {(form.examType === "Monthly Test" ? MONTHS : TERMS).map((period) => (
                    <option key={period}>{period}</option>
                  ))}
                </select>
              </Field>
            </div>

            {subjectsForForm.length > 0 && (
              <>
                <p className="text-sm font-semibold text-[#5A5034] mb-2">Subject Marks</p>
                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {subjectsForForm.map((subject) => subject.components.length ? (
                    <div key={subject.name}>
                      <p className="text-xs text-[#71694f] mb-1">{subject.name} (100 total)</p>
                      <div className="grid grid-cols-2 gap-2">
                        {subject.components.map((component) => {
                          const key = `${subject.name}${component}`;
                          return (
                            <Field key={key} label={`${component} / 50`}>
                              <input
                                type="number"
                                min="0"
                                max="50"
                                value={form.marks[key] ?? ""}
                                onChange={(e) => setForm({
                                  ...form,
                                  marks: { ...form.marks, [key]: e.target.value },
                                })}
                                className="input"
                              />
                            </Field>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <Field key={subject.name} label={`${subject.name} / ${subject.maxMarks}`}>
                      <input
                        type="number"
                        min="0"
                        max={subject.maxMarks}
                        value={form.marks[subject.name] ?? ""}
                        onChange={(e) => setForm({
                          ...form,
                          marks: { ...form.marks, [subject.name]: e.target.value },
                        })}
                        className="input"
                      />
                    </Field>
                  ))}
                </div>
              </>
            )}

            {formError && <p className="text-sm text-[#8a1f1f] mb-3">{formError}</p>}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg text-[#5A5034] hover:bg-[#eee9d9]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-[#FF6500] hover:bg-[#e85b00] disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg transition"
              >
                {saving ? "Saving…" : "Save Result"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tailwind can't see dynamically-composed class names easily, so a
          tiny scoped style covers the repeated input styling used above. */}
      <style>{`.input { width: 100%; padding: 0.65rem 1rem; border-radius: 0.5rem; border: 1px solid #d5ceb9; background: white; outline: none; }
        .input:focus { box-shadow: 0 0 0 2px #FF6500; }`}</style>
    </Layout>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs text-[#71694f] mb-1">{label}</label>
      {children}
    </div>
  );
}

function SummaryCard({ label, value, accent }) {
  return (
    <div className="bg-[#F8F5E9] rounded-xl p-4 shadow-lg text-center">
      <p className="text-xs text-[#71694f]">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${accent ? "text-[#FF6500]" : "text-[#5A5034]"}`}>
        {value}
      </p>
    </div>
  );
}
