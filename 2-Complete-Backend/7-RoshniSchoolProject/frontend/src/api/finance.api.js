// src/api/finance.api.js
import axiosClient from "./axiosClient";

export async function getFinanceRecords() {
  const { data } = await axiosClient.get("/api/finance/records");
  return data;
}

export async function getProfitTrend() {
  const { data } = await axiosClient.get("/api/finance/trend");
  return data;
}

export async function saveFinanceMonth(payload) {
  const { data } = await axiosClient.post("/api/finance/record", payload);
  return data; // { success, record }
}