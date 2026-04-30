import type { FC } from "react";
import { Outlet } from "react-router";

const AppLayout: FC = () => {
  return (
    <main className="min-h-screen">
      <Outlet />
    </main>
  );
};

export default AppLayout;
