// src/api/dashboard.api.js
import axiosClient from "./axiosClient";

export async function getDashboardSummary({ month, term, className } = {}) {
  const params = new URLSearchParams();
  if (month) params.set("month", month);
  if (term) params.set("term", term);
  if (className) params.set("class", className);
  const qs = params.toString() ? `?${params.toString()}` : "";
  const { data } = await axiosClient.get(`/api/dashboard/summary${qs}`);
  return data; // { fees, results }
}
