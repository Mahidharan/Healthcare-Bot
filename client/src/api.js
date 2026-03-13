import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || "/api";
const API_BASE_URL = rawBaseUrl.endsWith("/")
  ? rawBaseUrl.slice(0, -1)
  : rawBaseUrl;

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getMe = () => API.get("/auth/me");

// Chat API
export const sendMessage = (conversationId, message) =>
  API.post("/chat/send", { conversationId, message });

export const getChatHistory = () => API.get("/chat/history");

export const getConversation = (id) => API.get(`/chat/history/${id}`);

export const deleteConversation = (id) => API.delete(`/chat/history/${id}`);

// Symptom API
export const checkSymptoms = (data) => API.post("/symptom/check", data);

export const getSymptomHistory = () => API.get("/symptom/history");

// Resources API
export const getResources = () => API.get("/resources");

export const getResourceById = (id) => API.get(`/resources/${id}`);

export const getResourcesByCategory = (category) =>
  API.get(`/resources/category/${encodeURIComponent(category)}`);

export default API;
