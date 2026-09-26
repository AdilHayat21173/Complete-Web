// src/api/result.api.js
import axiosClient from "./axiosClient";

export async function getResultRecords() {
  const { data } = await axiosClient.get("/api/results/records");
  return data;
}

export async function getTerms() {
  const { data } = await axiosClient.get("/api/results/terms");
  return data;
}

export async function getClasses() {
  const { data } = await axiosClient.get("/api/results/classes");
  return data;
}

export async function getStudentsForClass(className) {
  const { data } = await axiosClient.get(
    `/api/results/students?class=${encodeURIComponent(className)}`
  );
  return data;
}

export async function getSubjectsForClass(className, examType = "Term Result") {
  const { data } = await axiosClient.get(
    `/api/results/subjects?class=${encodeURIComponent(className)}&examType=${encodeURIComponent(examType)}`
  );
  return data;
}

export async function getResultSummary({ term, month, examType, className } = {}) {
  const params = new URLSearchParams();
  if (term) params.set("term", term);
  if (month) params.set("month", month);
  if (examType) params.set("examType", examType);
  if (className) params.set("class", className);
  const qs = params.toString() ? `?${params.toString()}` : "";
  const { data } = await axiosClient.get(`/api/results/summary${qs}`);
  return data;
}

export async function saveResult(payload) {
  // payload: { idNo, name, father, class, term, marks: { Subject: number, ... } }
  const { data } = await axiosClient.post("/api/results/record", payload);
  return data; // { success, record }
}
