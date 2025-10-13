import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slice/sidebar.slice";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.VITE_API_URL !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
