'use client';

import { routes } from "@/app/lib/routes";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  CreditCard,
  Bell,
  Calendar,
  FileText,
  MessageSquare,
  Users,
  Settings,
  BarChart3,
  Vote,
  X,
  ChevronRight
} from 'lucide-react';

const menuItems = [
  { name: "Dashboard", icon: Home, href: routes.dashboard },
  { name: "Payments", icon: CreditCard, href: routes.payments },
  { name: "Announcements", icon: Bell, href: routes.announcements },
  { name: 'Events', icon: Calendar, href: '/dashboard/events' },
  { name: 'Documents', icon: FileText, href: '/dashboard/documents' },
  { name: 'Messages', icon: MessageSquare, href: '/dashboard/messages' },
  { name: 'Polls', icon: Vote, href: '/dashboard/polls' },
  { name: 'Profile', icon: Users, href: '/dashboard/profile' },
];

const adminItems = [
  { name: 'Admin Dashboard', icon: BarChart3, href: '/admin/dashboard' },
  { name: 'Manage Residents', icon: Users, href: '/admin/residents' },
  { name: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function Sidebar({ isOpen, onClose, isAdmin }) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-slate-200 transition-transform lg:translate-x-0 lg:static',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-5 border-b">
            <h1 className="text-lg font-bold">HOA Portal</h1>
            <button onClick={onClose} className="lg:hidden">
              <X />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map(item => {
             const active = pathname.startsWith(item.href);
           return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium',
                    active
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                  {active && <ChevronRight className="ml-auto w-4 h-4" />}
                </Link>
              );
            })}

            {isAdmin && (
              <>
                <div className="my-4 border-t" />
                <p className="px-4 text-xs font-semibold text-slate-400">
                  ADMIN TOOLS
                </p>
                {adminItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-slate-50"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                ))}
              </>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}
