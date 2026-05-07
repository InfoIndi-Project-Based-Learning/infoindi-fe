import type { RouteObject } from "react-router";
import Landing from "../pages/public/Landing";
import Explore from "../pages/public/Explore";
import Category from "../pages/public/Category";
import AppLayout from "../layouts/AppLayout";

const publicRoutes: RouteObject = {
  path: "/",
  Component: AppLayout,
  children: [
    {
      path: "/",
      Component: Landing,
    },
    {
      path: "/eksplor",
      Component: Explore,
    },
    {
      path: "/kategori/:slug",
      Component: Category,
    },
  ],
};

export default publicRoutes;

