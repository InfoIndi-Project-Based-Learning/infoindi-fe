import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCheck, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { useNotifications, useMarkAsRead, useMarkAllAsRead, useUnreadCount } from "../api/use-notifications";
import type { Notification } from "../types/notification";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { data: notificationsData, isLoading } = useNotifications(1);
  const { data: unreadData } = useUnreadCount();
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();

  const notifications = notificationsData?.data || [];
  const unreadCount = unreadData?.unread_count || 0;

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.is_read) {
      markAsRead.mutate(notification.id);
    }

    // Navigation logic based on type
    if (notification.type === 'new_post' || notification.type === 'post_liked' || notification.type === 'post_commented') {
      if (notification.post_id) {
        navigate(`/posts/${notification.post_id}`);
      }
    } else if (notification.type === 'new_follower') {
      if (notification.sender?.username) {
        navigate(`/users/${notification.sender.username}`);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded-xl" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 bg-white border border-gray-100 rounded-2xl shadow-sm" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-blue-600" />
            Notifikasi
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">
            Kelola aktivitas terbaru Anda dan interaksi dari pengguna lain.
          </p>
        </div>
        {unreadCount > 0 && (
          <Button 
            onClick={() => markAllAsRead.mutate()}
            variant="outline"
            size="sm"
            className="gap-2 rounded-xl border-gray-200 text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 transition-all font-semibold"
          >
            <CheckCheck className="w-4 h-4" />
            Tandai semua dibaca
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`group flex gap-4 p-5 bg-white border rounded-2xl shadow-sm transition-all cursor-pointer hover:shadow-md ${
                !notification.is_read 
                  ? "border-blue-100 bg-blue-50/10 ring-1 ring-blue-50/50" 
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <Avatar className="h-12 w-12 shrink-0 border-2 border-white shadow-sm ring-1 ring-gray-100">
                <AvatarImage 
                  src={notification.sender?.profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${notification.sender?.name || 'Admin'}`} 
                  className="object-cover"
                />
                <AvatarFallback className="bg-gray-100 text-gray-400 font-bold">
                  {notification.sender?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-base leading-tight ${!notification.is_read ? "font-bold text-gray-900" : "font-semibold text-gray-800"}`}>
                    {notification.title}
                  </h3>
                  <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true, locale: id })}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  {notification.message}
                </p>

                {!notification.is_read && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)] animate-pulse" />
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Baru</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 bg-white border border-dashed border-gray-200 rounded-3xl">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Inbox className="w-10 h-10 text-gray-200" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Kotak Masuk Kosong</h3>
            <p className="text-gray-500 text-center max-w-xs font-medium">
              Anda belum memiliki notifikasi saat ini. Aktivitas akan muncul di sini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
