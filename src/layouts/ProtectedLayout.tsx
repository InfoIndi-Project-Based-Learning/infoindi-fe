import { Navigate, Outlet } from "react-router";
import useAuthStore from "../hooks/auth/useAuthStore";

const ProtectedLayout = () => {
  const { user } = useAuthStore();

  if (!user) return <Navigate to={"/auth/login"} replace />;

  return <Outlet />;
};

export default ProtectedLayout;
