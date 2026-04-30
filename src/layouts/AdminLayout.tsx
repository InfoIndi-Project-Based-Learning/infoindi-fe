import { Navigate, Outlet } from "react-router";
import useAuthStore from "../hooks/auth/useAuthStore";

const AdminLayout = () => {
  const { user } = useAuthStore();
  if (user?.role !== "admin") return <Navigate to={"/"} />;
  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminLayout;
