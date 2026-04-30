import type { RouteObject } from "react-router";
import Dashboard from "../pages/private/User/Dashboard";
import UserLayout from "../layouts/UserLayout";

const UserRoutes: RouteObject = {
  path: "/",
  Component: UserLayout,
  children: [
    {
      path: "dashboard",
      Component: Dashboard,
    },
  ],
};

export default UserRoutes;
