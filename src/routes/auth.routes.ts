import type { RouteObject } from "react-router";
import Register from "../pages/public/Auth/Register";
import Login from "../pages/public/Auth/Login";
import AuthLayout from "../layouts/AuthLayout";

const authRoutes: RouteObject = {
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
};

export default authRoutes;
