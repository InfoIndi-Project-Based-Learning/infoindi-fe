import { Outlet } from "react-router";

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F3F0FF] ">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
