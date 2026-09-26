// src/pages/FinanceSystem.jsx
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getFinanceRecords, getProfitTrend, saveFinanceMonth } from "../api/finance.api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const EMPTY_FORM = {
  month: "",
  admissionFees: "",
  feesReceived: "",
  salary: "",
  electricity: "",
  building: "",
};

export default function FinanceSystem() {
  const [records, setRecords] = useState([]);
  const [trend, setTrend] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const [r, t] = await Promise.all([getFinanceRecords(), getProfitTrend()]);
      setRecords(r);
      setTrend(t);
      setError("");
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const money = (n) => `Rs. ${Number(n || 0).toLocaleString()}`;

  const openNewForm = () => {
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (row) => {
    setForm({
      month: row["Month"],
      admissionFees: row["Admission Fees"],
      feesReceived: row["Total Fees Received"],
      salary: row["Staff/Teacher Salary"],
      electricity: row["Electricity"],
      building: row["Building"],
    });
    setFormError("");
    setShowForm(true);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.month) {
      setFormError("Month is required.");
      return;
    }
    try {
      setSaving(true);
      await saveFinanceMonth(form);
      setShowForm(false);
      await load();
    } catch (e) {
      setFormError(e.response?.data?.message || e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#F8F5E9]">Profit & Loss</h2>
          <p className="text-[#eee8d8] mt-1">Monthly income, expenses and profit</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button
            onClick={() => setShowGraph((v) => !v)}
            className="w-full bg-[#5A5034] px-5 py-3 font-semibold text-white shadow transition hover:bg-[#4a4229] sm:w-auto rounded-lg"
          >
            {showGraph ? "Hide Graph" : "View Graph"}
          </button>
          <button
            onClick={openNewForm}
            className="w-full bg-[#FF6500] px-5 py-3 font-semibold text-white shadow transition hover:bg-[#e85b00] sm:w-auto rounded-lg"
          >
            + Add / Update Month
          </button>
        </div>
      </div>

      {error && <div className="mb-6 bg-[#fddede] text-[#8a1f1f] rounded-lg p-4">{error}</div>}

      {showGraph && (
        <div className="bg-[#F8F5E9] rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-[#5A5034] mb-4">Net Profit by Month</h3>
          {trend.length === 0 ? (
            <p className="text-[#71694f]">No data yet — add a month first.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4dfd2" />
                <XAxis dataKey="month" stroke="#5A5034" />
                <YAxis stroke="#5A5034" />
                <Tooltip formatter={(v) => money(v)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="netProfit"
                  name="Net Profit"
                  stroke="#FF6500"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      )}

      <div className="bg-[#F8F5E9] rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-[#ddd6c2]">
          <h3 className="text-xl font-bold text-[#5A5034]">Monthly Ledger</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#eee9d9]">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Month</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Admission Fees</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Fees Received</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Total Income</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Salary</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Electricity</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Building</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Total Expense</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Net Profit</th>
                <th className="px-4 py-3 text-left text-sm text-[#5A5034]">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={10} className="px-4 py-6 text-center text-[#71694f]">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && records.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-6 text-center text-[#71694f]">
                    No records yet.
                  </td>
                </tr>
              )}
              {records.map((r, i) => {
                const profit = Number(r["Net Profit"]) || 0;
                return (
                  <tr key={i} className="border-b border-[#e4dfd2]">
                    <td className="px-4 py-3 font-medium text-[#5A5034]">{r["Month"]}</td>
                    <td className="px-4 py-3 text-[#71694f]">{money(r["Admission Fees"])}</td>
                    <td className="px-4 py-3 text-[#71694f]">{money(r["Total Fees Received"])}</td>
                    <td className="px-4 py-3 font-semibold text-[#5A5034]">
                      {money(r["Total Income"])}
                    </td>
                    <td className="px-4 py-3 text-[#71694f]">{money(r["Staff/Teacher Salary"])}</td>
                    <td className="px-4 py-3 text-[#71694f]">{money(r["Electricity"])}</td>
                    <td className="px-4 py-3 text-[#71694f]">{money(r["Building"])}</td>
                    <td className="px-4 py-3 font-semibold text-[#5A5034]">
                      {money(r["Total Expense"])}
                    </td>
                    <td
                      className={`px-4 py-3 font-bold ${
                        profit >= 0 ? "text-[#5A5034]" : "text-[#8a1f1f]"
                      }`}
                    >
                      {money(profit)}
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <form onSubmit={submitForm} className="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-xl bg-[#F8F5E9] p-6 shadow-lg">
            <h3 className="text-xl font-bold text-[#5A5034] mb-4">Add / Update Month</h3>

            <div className="space-y-3 mb-4">
              <Field label="Month">
                <input
                  value={form.month}
                  onChange={(e) => setForm({ ...form, month: e.target.value })}
                  placeholder="e.g. April"
                  className="input"
                />
              </Field>
              <Field label="Admission Fees">
                <input
                  type="number"
                  value={form.admissionFees}
                  onChange={(e) => setForm({ ...form, admissionFees: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Total Fees Received">
                <input
                  type="number"
                  value={form.feesReceived}
                  onChange={(e) => setForm({ ...form, feesReceived: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Staff/Teacher Salary">
                <input
                  type="number"
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Electricity">
                <input
                  type="number"
                  value={form.electricity}
                  onChange={(e) => setForm({ ...form, electricity: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Building">
                <input
                  type="number"
                  value={form.building}
                  onChange={(e) => setForm({ ...form, building: e.target.value })}
                  className="input"
                />
              </Field>
            </div>

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
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}

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