import type { FC } from "react";
import { Outlet } from "react-router";

const AppLayout: FC = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-4">
      <Outlet />
    </main>
  );
};

export default AppLayout;
