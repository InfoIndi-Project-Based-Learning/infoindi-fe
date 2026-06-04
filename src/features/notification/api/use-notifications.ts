import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import type { NotificationResponse, UnreadCountResponse } from "../types/notification";

export const useNotifications = (page = 1) => {
  return useQuery<NotificationResponse>({
    queryKey: ["notifications", page],
    queryFn: async () => {
      const response = await api.get<NotificationResponse>(`/notifications?page=${page}`);
      return response.data;
    },
  });
};

export const useUnreadCount = () => {
  return useQuery<UnreadCountResponse>({
    queryKey: ["notifications", "unread-count"],
    queryFn: async () => {
      const response = await api.get<UnreadCountResponse>("/notifications/unread-count");
      return response.data;
    },
    refetchInterval: 30000, // Poll every 30 seconds
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.post(`/notifications/${id}/read`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await api.post("/notifications/read-all", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
    },
  });
};
