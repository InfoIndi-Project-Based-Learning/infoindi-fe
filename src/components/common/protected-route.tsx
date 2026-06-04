import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "@/features/auth/hooks/use-auth-store";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuth, user, _hasHydrated } = useAuthStore();
  const location = useLocation();

  // Wait for hydration to avoid flashing or incorrect redirects
  if (!_hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAuth || !user || !user.id) {
    // Redirect to login page if not authenticated or user is missing/empty
    return <Navigate to="/auth/login" replace />;
  }

  // 1. Check Email Verification for regular users
  if (!user?.email_verified_at && user?.role === "user") {
    return <Navigate to="/auth/verify-email" replace />;
  }

  // 2. Check Profile Completion for regular users (forces them to settings if profile is incomplete)
  const isSettingsPage = location.pathname === "/settings";
  
  if (user?.role === "user" && !user?.is_profile_complete && !isSettingsPage) {
    return <Navigate to="/settings" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their respective correct dashboards if role is not allowed
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // Render child routes
  return <Outlet />;
}
