import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { useAuthStore } from "@/stores/authStore";

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

// Request interceptor
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  const locale = localStorage.getItem("locale") || "en";
  const authStore = useAuthStore()

  config.withCredentials = false;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    authStore.logout();
  }

  config.headers["Accept-Language"] = locale;
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();

    // If 401 or 422, log out
    if (error.response.status === 401 || error.response.status === 422) {
      authStore.logout();
      authStore.message = "Login session expired";
    }

    return Promise.reject(error);
  }
);

export default instance;
