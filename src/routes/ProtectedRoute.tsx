import { Navigate, Outlet, useLocation } from "react-router-dom";
import useBoundStore from "../stores";

export default function ProtectedRoute() {
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
}
