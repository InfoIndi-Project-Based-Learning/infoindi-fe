import { createBrowserRouter } from "react-router";
import publicRoutes from "./public.routes";
import adminRoutes from "./admin.routes";
import UserRoutes from "./user.routes";
import authRoutes from "./auth.routes";

const router = createBrowserRouter([
  publicRoutes,
  adminRoutes,
  UserRoutes,
  authRoutes,
]);

export default router;
