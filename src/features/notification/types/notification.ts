import type { User } from "@/features/user/types/user-type";

export type NotificationType = 
  | 'admin' 
  | 'new_post' 
  | 'new_follower' 
  | 'post_liked' 
  | 'post_commented';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  sender?: User;
  post_id?: string;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface NotificationResponse {
  data: Notification[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface UnreadCountResponse {
  unread_count: number;
}
