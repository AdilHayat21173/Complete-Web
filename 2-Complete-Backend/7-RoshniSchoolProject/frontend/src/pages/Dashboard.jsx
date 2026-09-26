// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getDashboardSummary } from "../api/dashboard.api";
import { getFeeMonths, getRecentPayments } from "../api/fee.api";
import { getTerms } from "../api/result.api";

export default function Dashboard() {
  const [months, setMonths] = useState([]);
  const [terms, setTerms] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [selectedTerm, setSelectedTerm] = useState("All Terms");

  const [summary, setSummary] = useState({ fees: null, results: null });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [m, t, r] = await Promise.all([getFeeMonths(), getTerms(), getRecentPayments()]);
        setMonths(m);
        setTerms(t);
        setRecent(r);
      } catch (e) {
        setError(e.response?.data?.message || e.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (!summary.fees && !summary.results) setLoading(true);
        const data = await getDashboardSummary({ month: selectedMonth, term: selectedTerm });
        setSummary(data);
        setError("");
      } catch (e) {
        setError(e.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedMonth, selectedTerm]);

  const money = (n) => `Rs. ${Number(n || 0).toLocaleString()}`;

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#F8F5E9]">Dashboard</h2>
          <p className="text-[#eee8d8] mt-1">Overview of fees and results</p>
        </div>

      </div>

      {error && (
        <div className="mb-6 bg-[#fddede] text-[#8a1f1f] rounded-lg p-4">{error}</div>
      )}

      {/* Fee cards */}
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-[#F8F5E9]">Fees — {selectedMonth}</h3>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          aria-label="Fee month"
          className="px-4 py-2 rounded-lg border border-[#d5ceb9] bg-[#F8F5E9] text-[#5A5034] font-medium outline-none focus:ring-2 focus:ring-[#FF6500]"
        >
          <option>All Months</option>
          {months.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <Card label="Total Students" value={loading ? "…" : summary.fees?.totalStudents ?? 0} />
        <Card label="Total Fees" value={loading ? "…" : money(summary.fees?.totalFees)} accent />
        <Card label="Paid Fees" value={loading ? "…" : money(summary.fees?.paidFees)} />
        <Card
          label="Remaining Fees"
          value={loading ? "…" : money(summary.fees?.remainingFees)}
          accent
        />
      </div>

      {/* Result cards */}
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-[#F8F5E9]">Results — {selectedTerm}</h3>
        <select
          value={selectedTerm}
          onChange={(e) => setSelectedTerm(e.target.value)}
          aria-label="Result term"
          className="px-4 py-2 rounded-lg border border-[#d5ceb9] bg-[#F8F5E9] text-[#5A5034] font-medium outline-none focus:ring-2 focus:ring-[#FF6500]"
        >
          <option>All Terms</option>
          {["1st Term", "Mid Term", "Final Term", ...terms]
            .filter((term, index, all) => all.indexOf(term) === index)
            .map((term) => (
              <option key={term}>{term}</option>
            ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <Card label="Students Graded" value={loading ? "…" : summary.results?.totalStudents ?? 0} />
        <Card label="Passed" value={loading ? "…" : summary.results?.passed ?? 0} />
        <Card label="Failed" value={loading ? "…" : summary.results?.failed ?? 0} accent />
        <Card
          label="Average %"
          value={loading ? "…" : `${summary.results?.avgPercentage ?? 0}%`}
        />
      </div>

      {/* Recent payments */}
      <div className="bg-[#F8F5E9] rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-[#ddd6c2]">
          <h3 className="text-xl font-bold text-[#5A5034]">Recent Fee Payments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#eee9d9]">
              <tr>
                <th className="text-left px-6 py-4 text-sm text-[#5A5034]">Student</th>
                <th className="text-left px-6 py-4 text-sm text-[#5A5034]">Class</th>
                <th className="text-left px-6 py-4 text-sm text-[#5A5034]">Month</th>
                <th className="text-left px-6 py-4 text-sm text-[#5A5034]">Paid</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-6 text-center text-[#71694f]">
                    No payments recorded yet.
                  </td>
                </tr>
              )}
              {recent.map((r, i) => (
                <tr key={i} className="border-b border-[#e4dfd2]">
                  <td className="px-6 py-4 font-medium text-[#5A5034]">{r["Name of Student"]}</td>
                  <td className="px-6 py-4 text-[#71694f]">{r["Class"]}</td>
                  <td className="px-6 py-4 text-[#71694f]">{r["Month"]}</td>
                  <td className="px-6 py-4 font-semibold text-[#5A5034]">
                    {money(r["Recived Fee"])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

function Card({ label, value, accent }) {
  return (
    <div className="bg-[#F8F5E9] rounded-xl p-6 shadow-lg">
      <div>
        <p className="text-sm text-[#71694f]">{label}</p>
        <h3
          className={`text-3xl font-bold mt-2 ${accent ? "text-[#FF6500]" : "text-[#5A5034]"}`}
        >
          {value}
        </h3>
      </div>
    </div>
  );
}
