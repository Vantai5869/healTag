'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Bell } from "lucide-react";

// Fake data for demonstration
const initialNotifications = [
  { id: 1, text: 'Lịch hẹn của bạn đã được xác nhận.', read: false, time: '5 phút trước' },
  { id: 2, text: 'Tin nhắn mới từ BS. Tuấn.', read: false, time: '1 giờ trước' },
  { id: 3, text: 'Chào mừng bạn đến với HealTAG!', read: true, time: '1 ngày trước' },
  { id: 4, text: 'Kết quả xét nghiệm của bạn đã có.', read: true, time: '2 ngày trước' },
];

export default function NotificationDropdown() {
  const t = useTranslations('Notification');
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative outline-none cursor-pointer">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 mt-2">
        <DropdownMenuLabel>{t('title')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start gap-1 whitespace-normal cursor-pointer ${!notification.read ? 'bg-blue-50 hover:bg-blue-100' : ''}`}
                onSelect={() => markAsRead(notification.id)}
              >
                <p className="text-sm">{notification.text}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </DropdownMenuItem>
            ))
          ) : (
            <p className="p-4 text-sm text-muted-foreground text-center">{t('noNotifications')}</p>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
