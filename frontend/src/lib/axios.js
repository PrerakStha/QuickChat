// lib/axios.js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3001/api" : "/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await window.Clerk?.session?.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});