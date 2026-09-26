// src/api/auth.api.js
import axiosClient from "./axiosClient";

export async function registerUser({ username, email, password }) {
  const { data } = await axiosClient.post("/auth/register", {
    username,
    email,
    password,
  });
  return data; // always creates a "teacher" account — see backend README
}

export async function loginUser({ email, password }) {
  const { data } = await axiosClient.post("/auth/login", { email, password });
  return data; // { message, user, token }
}

export async function logoutUser() {
  const { data } = await axiosClient.post("/auth/logout");
  return data;
}

export async function getMe() {
  const { data } = await axiosClient.get("/auth/me");
  return data.user;
}

// Admin-only
export async function listUsers() {
  const { data } = await axiosClient.get("/auth/users");
  return data.users;
}

// Admin-only
export async function updateUserRole(userId, role) {
  const { data } = await axiosClient.patch(`/auth/users/${userId}/role`, { role });
  return data;
}
