import { Navigate, Outlet } from "react-router";
import useAuthStore from "../hooks/auth/useAuthStore";

const UserLayout = () => {
  const { user } = useAuthStore();
  if (user?.role !== "user") return <Navigate to={"/"} />;
  return (
    <>
      <Outlet />
    </>
  );
};

export default UserLayout;
