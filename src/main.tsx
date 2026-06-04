import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QueryProvider from "./providers/query-provider";
import PublicLayout from "./layouts/public-layout";
import HomePage from "./features/public/pages/home";
import ExplorePage from "./features/public/pages/explore";
import HelpPage from "./features/public/pages/help";
import CategoryDetailPage from "./features/public/pages/category-detail";
import { LoginPage } from "./features/auth/pages/login";
import { RegisterPage } from "./features/auth/pages/register";
import { VerifyEmailPage } from "./features/auth/pages/verify-email";
import { VerifyEmailHandlerPage } from "./features/auth/pages/verify-email-handler";
import { OAuthCallbackPage } from "./features/auth/pages/oauth-callback";
import { DashboardLayout } from "./layouts/dashboard-layout";
import { Dashboard } from "./features/user/pages/dashboard";
import { CreatePost } from "./features/post/pages/create-post";
import { EditPost } from "./features/post/pages/edit-post";
import { PostDetail } from "./features/post/pages/post-detail";
import { UserProfile } from "./features/user/pages/user-profile";
import { ProfileSettings } from "./features/user/pages/profile-setting";
import NotificationsPage from "./features/notification/pages/notifications";
import ProtectedRoute from "./components/common/protected-route";
import GuestRoute from "./components/common/guest-route";
import { AdminLayout } from "./layouts/admin-layout";
import { AdminDashboard } from "./features/admin/pages/admin-dashboard";
import { UserManagement as AdminUsers } from "./features/admin/pages/user-management";
import { CategoriesManagement as AdminCategories } from "./features/admin/pages/categories-management";
import { ReportManagement as AdminReports } from "./features/admin/pages/report-management";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="bantuan" element={<HelpPage />} />
            <Route path="post/:id" element={<PostDetail />} />
            <Route path="users/:username" element={<UserProfile />} />
            <Route path="kategori/:id" element={<CategoryDetailPage />} />
          </Route>
          
          {/* Auth Routes */}
          <Route element={<GuestRoute />}>
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="auth/register" element={<RegisterPage />} />
          </Route>
          
          <Route path="auth/verify-email" element={<VerifyEmailPage />} />
          <Route path="verify-email" element={<VerifyEmailHandlerPage />} />
          <Route path="auth/oauth-callback" element={<OAuthCallbackPage />} />
          
          {/* Protected User Routes */}
          <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
            <Route element={<DashboardLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="create-post" element={<CreatePost />} />
              <Route path="edit-post/:id" element={<EditPost />} />
              <Route path="settings" element={<ProfileSettings />} />
              <Route path="notifications" element={<NotificationsPage />} />
            </Route>
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/users" element={<AdminUsers />} />
              <Route path="admin/categories" element={<AdminCategories />} />
              <Route path="admin/reports" element={<AdminReports />} />
              <Route path="admin/settings" element={<ProfileSettings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryProvider>
  </StrictMode>,
);
