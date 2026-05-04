import { Navigate, Outlet } from "react-router";
import useAuthStore from "../hooks/auth/useAuthStore";

const UserLayout = () => {
  const { user } = useAuthStore();
  return user.role !== "user" ? <Navigate to={"/"} /> : <Outlet />;
};

export default UserLayout;
