import axios from "axios";

const api = axios.create({
  baseURL: "https://render-demo-j7ch.onrender.com/api",
});

// Automatically add token to headers if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
