import axios from "axios";
import useAuthStore from "@/features/auth/hooks/use-auth-store";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((cfg) => {
  const token = useAuthStore.getState().token;
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const url = err.config?.url;
    
    // HTTP 401 Unauthorized
    if (err.response?.status === 401 && url !== "/auth/login") {
      useAuthStore.getState().removeAuth();
      
      const publicPaths = ["/", "/bantuan"];
      const isPublicPath =
        publicPaths.includes(window.location.pathname) ||
        window.location.pathname.startsWith("/post/");

      if (!isPublicPath) {
        window.location.href = "/auth/login";
      }
    }

    // HTTP 403 Forbidden (Banned user or unauthorized action)
    if (err.response?.status === 403) {
      const message = err.response?.data?.message || "";
      if (message.toLowerCase().includes("banned") || message.toLowerCase().includes("ditangguhkan")) {
        useAuthStore.getState().removeAuth();
        window.location.href = "/auth/login?error=banned";
      }
    }

    return Promise.reject(err);
  },
);

export default axiosInstance;

