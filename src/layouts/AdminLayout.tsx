import { Navigate, Outlet } from "react-router";
import useAuthStore from "../hooks/auth/useAuthStore";

const AdminLayout = () => {
  const { user } = useAuthStore();
  return user.role !== "admin" ? <Navigate to={"/"} /> : <Outlet />;
};

export default AdminLayout;
