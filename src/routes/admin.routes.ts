import type { RouteObject } from "react-router";
import Dashboard from "../pages/private/Admin/Dashboard";

const adminRoutes: RouteObject = {
  path: "/admin",
  children: [
    {
      path: "dashboard",
      Component: Dashboard,
    },
  ],
};
export default adminRoutes;
