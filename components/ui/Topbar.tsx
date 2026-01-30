'use client';

import { Menu, Bell, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function TopBar({
  onMenuClick,
  user,
  unreadCount = 0,
  onLogout
}) {
  const initials =
    user?.full_name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2) || 'U';

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-semibold text-slate-800">Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell className="w-5 h-5 text-slate-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>

        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <button
          onClick={onLogout}
          className="p-2 rounded-md hover:bg-slate-100"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
