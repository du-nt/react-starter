import { Navigate, Outlet, useLocation } from "react-router-dom";
import useBoundStore from "../stores";

export default function UnAuthenticateRoute() {
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated);
  const { state } = useLocation();

  const path = state?.from?.pathname || "/";

  if (isAuthenticated) return <Navigate to={path} replace />;

  return <Outlet />;
}
