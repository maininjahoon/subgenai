import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicOnlyRoute() {
  const { user } = useAuth();
  if (user === undefined) {
    return null;
  }
  if (user !== null) {
    return <Navigate to="/account/dashboard" replace />;
  }
  return <Outlet />;
}
