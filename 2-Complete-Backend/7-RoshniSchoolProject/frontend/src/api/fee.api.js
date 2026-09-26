// src/api/fee.api.js
import axiosClient from "./axiosClient";

export async function getFeeRecords(month) {
  const qs = month && month !== "All Months" ? `?month=${encodeURIComponent(month)}` : "";
  const { data } = await axiosClient.get(`/api/fees/records${qs}`);
  return data;
}

export async function getFeeMonths() {
  const { data } = await axiosClient.get("/api/fees/months");
  return data;
}

export async function getFeeSummary(month) {
  const qs = month && month !== "All Months" ? `?month=${encodeURIComponent(month)}` : "";
  const { data } = await axiosClient.get(`/api/fees/summary${qs}`);
  return data;
}

export async function getRecentPayments() {
  const { data } = await axiosClient.get("/api/fees/recent-payments");
  return data;
}

export async function makeFeePayment({ idNo, month, amount, date }) {
  const { data } = await axiosClient.post("/api/fees/payment", { idNo, month, amount, date });
  return data; // { success, record }
}

export async function addFeeRecord(payload) {
  const { data } = await axiosClient.post("/api/fees/records", payload);
  return data; // { success, record }
}
