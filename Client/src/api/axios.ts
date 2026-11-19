import axios, { isAxiosError } from "axios";
import { store } from "../store/store";
import { toast } from "sonner";
import { refresh } from "./auth.api";
import { sessionExpired, sessionRefreshed } from "../features/auth/authSlice";

declare module "axios" {
  interface AxiosRequestConfig {
    skipErrorToast?: boolean;
    _retry?: boolean;
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

let refreshPromise: Promise<string> | null = null;

function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refresh()
      .then((data) => {
        store.dispatch(sessionRefreshed(data));
        return data.accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    const status = error.response?.status;
    const hasSession = store.getState().auth.token !== null;

    // Access token expired → refresh once and repeat the request.
    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      hasSession
    ) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();
        return api(originalRequest);
      } catch {
        // Refresh token is invalid too → the user must log in again.
        store.dispatch(sessionExpired());
        toast.error("Your session has expired. Please log in again.", {
          id: "session-expired",
        });
        return Promise.reject(error);
      }
    }

    if (!originalRequest?.skipErrorToast && status !== 400) {
      toast.error(getErrorMessage(status));
    }

    return Promise.reject(error);
  },
);

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

export default api;
