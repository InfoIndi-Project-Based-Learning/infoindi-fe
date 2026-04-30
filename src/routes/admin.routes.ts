import type { RouteObject } from "react-router";
import Dashboard from "../pages/private/Admin/Dashboard";
import AdminLayout from "../layouts/AdminLayout";

const adminRoutes: RouteObject = {
  path: "/admin",
  Component: AdminLayout,
  children: [
    {
      path: "dashboard",
      Component: Dashboard,
    },
  ],
};
export default adminRoutes;
