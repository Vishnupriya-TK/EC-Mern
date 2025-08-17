import axios from "axios";

const API = axios.create({
  baseURL: "/api" // proxy will send to backend
});

// Add token if logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
