import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/layouts/navbar";
import useAuthStore from "@/features/auth/hooks/use-auth-store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCategories } from "@/features/post/api/use-posts";
import api from "@/lib/api";
import type { User as UserType } from "@/features/user/types/user-type";

export function DashboardLayout() {
  const { user, updateUser, isAuth } = useAuthStore();
  const queryClient = useQueryClient();

  // Refresh user data on mount to ensure flags like is_profile_complete are fresh
  const { isLoading: isRefreshingUser } = useQuery({
    queryKey: ["auth-me"],
    queryFn: async () => {
      const response = await api.get<UserType>("/auth/me");
      if (response.data) {
        updateUser(response.data);
      }
      return response.data;
    },
    enabled: isAuth,
    staleTime: 0, // Always refresh once on mount/layout load
  });

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: fetchCategories,
      staleTime: 1000 * 60 * 5,
    });
  }, [queryClient]);

  if (isRefreshingUser && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
      <Navbar />

      {/* Page Content */}
      <main className="mx-auto w-full max-w-5xl px-4 py-8 flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
