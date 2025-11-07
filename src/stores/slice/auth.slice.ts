import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  userName: string;
  email: string;
  displayName: string;
  role?: string;
  avatarUri?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const savedAccessToken = localStorage.getItem("accessToken");
const savedRefreshToken = localStorage.getItem("refreshToken");

const initialState: AuthState = {
  user: null,
  accessToken: savedAccessToken,
  refreshToken: savedRefreshToken,
  isAuthenticated: !!savedAccessToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken?: string;
      }>
    ) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      if (refreshToken) state.refreshToken = refreshToken;
      state.isAuthenticated = true;

      localStorage.setItem("accessToken", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
