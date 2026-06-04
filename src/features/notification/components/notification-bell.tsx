import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { useNotifications, useUnreadCount, useMarkAsRead, useMarkAllAsRead } from "../api/use-notifications";
import type { Notification } from "../types/notification";

export function NotificationBell() {
  const navigate = useNavigate();
  const { data: notificationsData } = useNotifications(1);
  const { data: unreadData } = useUnreadCount();
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();

  const unreadCount = unreadData?.unread_count || 0;
  const notifications = notificationsData?.data || [];

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
    } else {
      // Default or admin
      navigate('/notifications');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 relative transition-all"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-80 bg-white border border-gray-100 shadow-xl rounded-2xl p-0 overflow-hidden z-50">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-sm text-gray-900">Notifikasi</h3>
          {unreadCount > 0 && (
            <button 
              onClick={() => markAllAsRead.mutate()}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Tandai semua dibaca
            </button>
          )}
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`flex gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${
                  !notification.is_read ? "bg-blue-50/30 hover:bg-blue-50/50" : "hover:bg-gray-50"
                }`}
              >
                <Avatar className="h-10 w-10 shrink-0 border border-gray-100">
                  <AvatarImage 
                    src={notification.sender?.profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${notification.sender?.name || 'Admin'}`} 
                    className="object-cover"
                  />
                  <AvatarFallback className="text-[10px] bg-gray-100 text-gray-500">
                    {notification.sender?.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className={`text-sm leading-snug ${!notification.is_read ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {notification.message}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                    {!notification.is_read && <span className="h-1.5 w-1.5 rounded-full bg-blue-500 inline-block" />}
                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true, locale: id })}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="py-10 text-center px-4">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell className="w-5 h-5 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-500">Belum ada notifikasi</p>
            </div>
          )}
        </div>

        <div className="p-2 bg-gray-50/50 border-t border-gray-100">
          <Button 
            variant="ghost" 
            className="w-full text-xs font-bold text-gray-600 hover:text-blue-600 rounded-xl py-2"
            onClick={() => navigate('/notifications')}
          >
            Lihat Semua Notifikasi
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
