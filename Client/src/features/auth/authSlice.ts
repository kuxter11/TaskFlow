import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../types/user.types";
import type { LoginData, RegisterData } from "../../types/auth.types";

import {
  login as loginRequest,
  register as registerRequest,
  refresh as refreshRequest,
  logout as logoutRequest,
} from "../../api/auth.api";

interface AuthState {
  user: User | null;
  token: string | null;
  isInitializing: boolean;
  isRefreshing: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isInitializing: true,
  isRefreshing: false,
  error: null,
};

// Restore an existing session using the HttpOnly refresh cookie.
export const refreshSession = createAsyncThunk(
  "auth/refreshSession",
  async (_, { rejectWithValue }) => {
    try {
      return await refreshRequest();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Session restoration failed",
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as { auth: AuthState };

      return !state.auth.isRefreshing;
    },
  },
);

// Login and retrieve the user and access token.
export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginData, { rejectWithValue }) => {
    try {
      return await loginRequest(data);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Login failed",
      );
    }
  },
);

// Register a new user. Registration does not automatically log them in.
export const register = createAsyncThunk(
  "auth/register",
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      await registerRequest(data);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Registration failed",
      );
    }
  },
);

// Logout and clear authentication state.
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutRequest();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Logout failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Refresh session
      .addCase(refreshSession.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshSession.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isInitializing = false;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(refreshSession.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isInitializing = false;
        state.isRefreshing = false;
      })

      // Login
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Register
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      });
  },
});

export const { clearAuthError } = authSlice.actions;

export default authSlice.reducer;
