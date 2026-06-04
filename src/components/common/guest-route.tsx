import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/features/auth/hooks/use-auth-store";
import { Loader2 } from "lucide-react";

export default function GuestRoute() {
  const { isAuth, user, _hasHydrated } = useAuthStore();

  // Wait for hydration to avoid flashing or incorrect redirects
  if (!_hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isAuth && user && user.id) {
    // If user is already authenticated, redirect them based on their role
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // If not authenticated, render the child components (Login, Register, etc.)
  return <Outlet />;
}
