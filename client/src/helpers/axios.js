import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 30000, // 30 seconds timeout
});

export default api;