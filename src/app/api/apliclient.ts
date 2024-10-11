// src/api/apiClient.ts
import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Cambia a la URL de tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // window.location.href = "/auth/login"; // Redirige a login si no está autenticado
    }
    return Promise.reject(error);
  }
);

export default apiClient;
