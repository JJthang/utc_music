import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "@/stores";

export const BlockAdminGuard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user && user.role === "ADMIN") {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};

export const ProtectedRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const GuestRoute = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
