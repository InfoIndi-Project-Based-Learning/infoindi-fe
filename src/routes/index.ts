import { createBrowserRouter } from "react-router";
import publicRoutes from "./public.routes";
import adminRoutes from "./admin.routes";
import UserRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import ProtectedLayout from "../layouts/ProtectedLayout";

const router = createBrowserRouter([
  publicRoutes,
  {
    path: "/",
    Component: ProtectedLayout,
    children: [adminRoutes, UserRoutes],
  },
  authRoutes,
]);

export default router;
