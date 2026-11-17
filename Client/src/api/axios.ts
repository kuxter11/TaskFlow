import axios, { isAxiosError } from "axios";
import { store } from "../store/store";
import { toast } from "sonner";

declare module "axios" {
  interface AxiosRequestConfig {
    skipErrorToast?: boolean;
  }
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

function getErrorMessage(status: number | undefined): string {
  if (status === undefined)
    return "Cannot reach the server. Check your connection.";
  if (status === 401)
    return "Your session has expired. Please refresh the page.";
  if (status === 403) return "You don't have permission to do that.";
  if (status === 404) return "The requested item was not found.";
  if (status >= 500) return "Something went wrong on the server.";
  return "Something went wrong.";
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error) && !error.config?.skipErrorToast) {
      const status = error.response?.status;

      // 400 = validation problem, which the form shows inline.
      if (status !== 400) {
        toast.error(getErrorMessage(status));
      }
    }

    return Promise.reject(error);
  },
);

export default api;
