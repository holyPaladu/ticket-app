import axios from "axios";
import { useAuthStore } from "@/store/authStore";
const apiClient = axios.create({
  baseURL: "/api/admin", // в dev проксируется, в проде бэкенд отвечает по тому же домену
  withCredentials: true, // если используете cookie-based auth
  headers: {
    "Content-Type": "application/json",
  },
});
// interceptor для добавления токена, если используется header auth
apiClient.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});
export default apiClient;
