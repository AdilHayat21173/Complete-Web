// src/pages/FeeSystem.jsx
import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import { getFeeMonths, getFeeRecords, makeFeePayment } from "../api/fee.api";
import { downloadFeeSlip } from "../utils/feeSlip";

function monthKey(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

export default function FeeSystem() {
  const [records, setRecords] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("All Months");
  const [cls, setCls] = useState("All Classes");

  const [showModal, setShowModal] = useState(false);
  const [payTarget, setPayTarget] = useState(null);
  const [payAmount, setPayAmount] = useState("");
  const [saving, setSaving] = useState(false);
  const [payError, setPayError] = useState("");
  const [paidRecord, setPaidRecord] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const [data, sheetMonths] = await Promise.all([
        getFeeRecords("All Months"),
        getFeeMonths(),
      ]);
      setRecords(data);
      setAvailableMonths(sheetMonths);
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

  const months = useMemo(
    () => {
      const uniqueMonths = [];
      const seen = new Set();
      availableMonths.filter(Boolean).forEach((value) => {
        const key = monthKey(value);
        if (!seen.has(key)) {
          seen.add(key);
          uniqueMonths.push(value);
        }
      });
      return ["All Months", ...uniqueMonths];
    },
    [availableMonths]
  );
  const classes = useMemo(
    () => ["All Classes", ...new Set(records.map((r) => r["Class"]).filter(Boolean))],
    [records]
  );

  const filtered = records.filter((r) => {
    const matchesSearch =
      !search ||
      String(r["Name of Student"]).toLowerCase().includes(search.toLowerCase()) ||
      String(r["ID. No"]).toLowerCase().includes(search.toLowerCase());
    const matchesMonth =
      month === "All Months" || monthKey(r["Month"]) === monthKey(month);
    const matchesClass = cls === "All Classes" || r["Class"] === cls;
    return matchesSearch && matchesMonth && matchesClass;
  });

  const openPayment = (row) => {
    setPayTarget(row);
    setPayAmount("");
    setPayError("");
    setPaidRecord(null);
    setShowModal(true);
  };

  const submitPayment = async () => {
    if (!payTarget) return;
    const amount = Number(payAmount);
    if (!amount || amount <= 0) {
      setPayError("Enter a valid amount greater than 0.");
      return;
    }
    try {
      setSaving(true);
      const result = await makeFeePayment({
        idNo: payTarget["ID. No"],
        month: payTarget["Month"],
        amount,
      });
      setPaidRecord(result.record);
      await load();
    } catch (e) {
      setPayError(e.response?.data?.message || e.message);
    } finally {
      setSaving(false);
    }
  };

  const money = (n) => `Rs. ${Number(n || 0).toLocaleString()}`;

  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#F8F5E9]">Fee System</h2>
        <p className="text-[#eee8d8] mt-1">Manage student fees and payments</p>
      </div>

      {error && <div className="mb-6 bg-[#fddede] text-[#8a1f1f] rounded-lg p-4">{error}</div>}

      <div className="bg-[#F8F5E9] rounded-xl p-5 shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student or ID No..."
            className="w-full px-4 py-3 rounded-lg border border-[#d5ceb9] bg-white outline-none focus:ring-2 focus:ring-[#FF6500]"
          />
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="px-4 py-3 rounded-lg border border-[#d5ceb9] bg-white outline-none focus:ring-2 focus:ring-[#FF6500]"
          >
            {months.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <select
            value={cls}
            onChange={(e) => setCls(e.target.value)}
            className="px-4 py-3 rounded-lg border border-[#d5ceb9] bg-white outline-none focus:ring-2 focus:ring-[#FF6500]"
          >
            {classes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-[#F8F5E9] rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-[#ddd6c2]">
          <h3 className="text-xl font-bold text-[#5A5034]">Student Fees</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#eee9d9]">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-[#5A5034]">Student</th>
                <th className="px-6 py-4 text-left text-sm text-[#5A5034]">Class</th>
                <th className="px-6 py-4 text-left text-sm text-[#5A5034]">Month</th>
                <th className="px-6 py-4 text-left text-sm text-[#5A5034]">Total Fee</th>
                <th className="px-6 py-4 text-left text-sm text-[#5A5034]">Paid</th>
                <th className="px-6 py-4 text-left text-sm text-[#5A5034]">Remaining</th>
                <th className="px-6 py-4 text-left text-sm text-[#5A5034]">Status</th>
                <th className="px-6 py-4 text-left text-sm text-[#5A5034]">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={8} className="px-6 py-6 text-center text-[#71694f]">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-6 text-center text-[#71694f]">
                    No records match your filters.
                  </td>
                </tr>
              )}
              {filtered.map((r, i) => {
                const total = Number(r["Total"]) || 0;
                const paid = Number(r["Recived Fee"]) || 0;
                const balance = Number(r["Blance"]) || 0;
                const status = balance <= 0 ? "Paid" : "Partial";
                return (
                  <tr key={i} className="border-b border-[#e4dfd2]">
                    <td className="px-6 py-4 font-medium text-[#5A5034]">{r["Name of Student"]}</td>
                    <td className="px-6 py-4 text-[#71694f]">{r["Class"]}</td>
                    <td className="px-6 py-4 text-[#71694f]">{r["Month"]}</td>
                    <td className="px-6 py-4 text-[#5A5034]">{money(total)}</td>
                    <td className="px-6 py-4 font-semibold text-[#5A5034]">{money(paid)}</td>
                    <td className="px-6 py-4 font-semibold text-[#FF6500]">
                      {money(Math.max(balance, 0))}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs text-white ${
                          status === "Paid" ? "bg-[#5A5034]" : "bg-[#FF6500]"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openPayment(r)}
                        disabled={status === "Paid"}
                        className="bg-[#FF6500] hover:bg-[#e85b00] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
                      >
                        Add Payment
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && payTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-xl bg-[#F8F5E9] p-5 shadow-lg sm:p-6">
            <h3 className="text-xl font-bold text-[#5A5034] mb-1">Add Payment</h3>
            <p className="text-sm text-[#71694f] mb-4">
              {payTarget["Name of Student"]} — {payTarget["Class"]} — {payTarget["Month"]}
            </p>

            <div className="mb-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div className="bg-white rounded-lg p-3">
                <p className="text-[#71694f]">Total Fee</p>
                <p className="font-semibold text-[#5A5034]">{money(payTarget["Total"])}</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-[#71694f]">Remaining</p>
                <p className="font-semibold text-[#FF6500]">
                  {money(Math.max(Number(payTarget["Blance"]) || 0, 0))}
                </p>
              </div>
            </div>

            {!paidRecord ? (
              <>
                <label className="block text-sm text-[#5A5034] mb-1">Amount received now</label>
                <input
                  type="number"
                  min="1"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  placeholder="e.g. 2000"
                  className="w-full px-4 py-3 rounded-lg border border-[#d5ceb9] bg-white outline-none focus:ring-2 focus:ring-[#FF6500] mb-2"
                />
                {payError && <p className="text-sm text-[#8a1f1f] mb-2">{payError}</p>}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg text-[#5A5034] hover:bg-[#eee9d9]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitPayment}
                    disabled={saving}
                    className="bg-[#FF6500] hover:bg-[#e85b00] disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg transition"
                  >
                    {saving ? "Saving…" : "Save Payment"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-[#5A5034] mb-4">
                  ✓ Payment saved. Receipt No <strong>{paidRecord["Recpt No"]}</strong>, dated{" "}
                  {paidRecord["Date"]}.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => downloadFeeSlip(paidRecord)}
                    className="bg-[#FF6500] hover:bg-[#e85b00] text-white font-semibold px-5 py-2 rounded-lg transition"
                  >
                    Print Slip
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-[#5A5034] hover:bg-[#4a4229] text-white font-semibold px-5 py-2 rounded-lg transition"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
