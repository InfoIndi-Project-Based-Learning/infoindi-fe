import type { RouteObject } from "react-router";
import Landing from "../pages/public/Landing";

const publicRoutes: RouteObject = {
  path: "/",
  Component: Landing,
};

export default publicRoutes;
