import type { RouteObject } from "react-router";
import Register from "../pages/public/Auth/Register";
import Login from "../pages/public/Auth/Login";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";

const authRoutes: RouteObject = {
  path: "/",
  Component: AppLayout,
  children: [
    {
      path: "/auth",
      Component: AuthLayout,
      children: [
        {
          path: "register",
          Component: Register,
        },
        {
          path: "login",
          Component: Login,
        },
      ],
    },
  ],
};

export default authRoutes;
