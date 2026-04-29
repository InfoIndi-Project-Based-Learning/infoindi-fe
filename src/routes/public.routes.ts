import type { RouteObject } from "react-router";
import Landing from "../pages/public/Landing";
import AppLayout from "../layouts/AppLayout";

const publicRoutes: RouteObject = {
  path: "/",
  Component: AppLayout,
  children: [
    {
      path: "/",
      Component: Landing,
    },
  ],
};

export default publicRoutes;
