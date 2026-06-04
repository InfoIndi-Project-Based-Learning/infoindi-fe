import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";

export interface AdminDashboardData {
  counts: {
    total_users: number;
    active_users: number;
    banned_users: number;
    total_posts: number;
    pending_reports: number;
  };
  user_growth: Array<{
    month: string;
    new_users: number;
  }>;
  posts_by_category: Array<{
    name: string;
    value: number;
  }>;
  recent_activities: any[];
}

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const response = await api.get<any>("/admin/dashboard");
      
      // Backend returns 'data' which contains the structure
      const d = response.data;
      
      // Map backend structure to frontend structure if necessary
      // Backend: data.counts, data.user_growth, etc.
      return {
        counts: d.counts || {
          total_users: 0,
          active_users: 0,
          banned_users: 0,
          total_posts: 0,
          pending_reports: 0
        },
        user_growth: d.user_growth || [],
        // Backend doesn't explicitly return posts_by_category in the overview yet, 
        // but we can mock or wait for it. Let's check api_docs.md again.
        // Actually api_docs.md says it returns counts, user_growth, user_activity, top_users.
        posts_by_category: d.posts_by_category || [], 
        recent_activities: d.top_users || []
      } as AdminDashboardData;
    },
  });
};

export const useAdminUsers = (params?: any) => {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: async () => {
      const response = await api.get<any[]>("/admin/users", params);
      return response.data || [];
    },
  });
};

export const useBanUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      return api.post(`/admin/users/${userId}/ban`, {});
    },
    onSuccess: () => {
      toast.success("Pengguna berhasil diblokir");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
    onError: (err) => toast.error(getErrorMessage(err))
  });
};

export const useUnbanUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      return api.post(`/admin/users/${userId}/unban`, {});
    },
    onSuccess: () => {
      toast.success("Blokir pengguna berhasil dicabut");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
    onError: (err) => toast.error(getErrorMessage(err))
  });
};

export const useAdminReports = () => {
  return useQuery({
    queryKey: ["admin-reports"],
    queryFn: async () => {
      const response = await api.get<any[]>("/admin/reports");
      return response.data || [];
    },
  });
};

export const useUpdateReportStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status, admin_notes }: { id: string, status: string, admin_notes?: string }) => {
      return api.put(`/admin/reports/${id}`, { status, admin_notes });
    },
    onSuccess: () => {
      toast.success("Status laporan diperbarui");
      queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
    onError: (err) => toast.error(getErrorMessage(err))
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { category_name: string, slug: string }) => {
      return api.post("/categories", data);
    },
    onSuccess: () => {
      toast.success("Kategori berhasil dibuat");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => toast.error(getErrorMessage(err))
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string, data: { category_name: string, slug: string } }) => {
      return api.put(`/categories/${id}`, data);
    },
    onSuccess: () => {
      toast.success("Kategori berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => toast.error(getErrorMessage(err))
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return api.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      toast.success("Kategori berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => toast.error(getErrorMessage(err))
  });
};

export const useBroadcastNotification = () => {
  return useMutation({
    mutationFn: async (data: { title: string; message: string }) => {
      return api.post("/admin/notifications/broadcast", data);
    },
    onSuccess: () => {
      toast.success("Pengumuman berhasil dikirim ke semua pengguna");
    },
    onError: (err) => toast.error(getErrorMessage(err))
  });
};
