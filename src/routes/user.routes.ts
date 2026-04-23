import type { RouteObject } from "react-router";
import Dashboard from "../pages/private/User/Dashboard";

const UserRoutes: RouteObject = {
  path: "/",
  children: [
    {
      path: "dashboard",
      Component: Dashboard,
    },
  ],
};

export default UserRoutes;
