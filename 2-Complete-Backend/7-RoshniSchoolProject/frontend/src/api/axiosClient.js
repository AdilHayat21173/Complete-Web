// src/api/axiosClient.js
// One shared axios instance. Every other file in src/api/ imports THIS,
// instead of calling axios directly, so the base URL and auth token are
// handled in exactly one place.

import axios from "axios";

const BASE_URL = "http://localhost:3000";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send the login cookie too, belt-and-suspenders
});

// Attach the JWT (saved at login) to every request automatically.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the backend ever says "your token is invalid/expired" (401), log the
// user out client-side so they land back on the login screen cleanly.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
