"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CreditCard, Megaphone, Calendar, FileText, User, HeadphonesIcon, ShieldCheck, Settings } from 'lucide-react';

// UPDATED: Added props to receive the close function from layout.tsx
interface SidebarProps {
  onItemClick?: () => void;
}

export default function Sidebar({ onItemClick }: SidebarProps) {
  const pathname = usePathname();
  const userRole = "ADMIN"; 

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', href: '/' },
    { icon: <CreditCard size={18} />, label: 'Payments', href: '/client/payments' },
    { icon: <Megaphone size={18} />, label: 'Announcements', href: '/announcements' },
    { icon: <Calendar size={18} />, label: 'Events', href: '/events' },
    { icon: <FileText size={18} />, label: 'Documents', href: '/documents' },
    { icon: <User size={18} />, label: 'Profile', href: '/profile' },
  ];

  const adminItems = [
    { icon: <User size={18} />, label: 'Manage Residents', href: '/admin/residents' },
    { icon: <CreditCard size={18} />, label: 'Review Payments', href: '/admin/payments' },
    { icon: <Settings size={18} />, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    // UPDATED: Changed w-64 h-screen to h-full w-full because layout.tsx now handles the width/height
    <aside className="w-full h-full bg-white border-r border-slate-100 flex flex-col p-6 overflow-y-auto">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">H</div>
        <div>
          <h1 className="text-sm font-bold text-slate-800 leading-none">HOA Portal</h1>
          <p className="text-[10px] text-slate-400 font-medium mt-1">Community Management</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
          return (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={onItemClick} // UPDATED: Closes menu on mobile click
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}

        {userRole === "ADMIN" && (
          <div className="mt-8 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-2 px-4 mb-4">
              <ShieldCheck size={12} className="text-slate-400" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin Tools</p>
            </div>
            {adminItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={onItemClick} // UPDATED: Closes menu on mobile click
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  pathname === item.href ? 'bg-slate-800 text-white font-bold' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className="mt-auto bg-slate-50 p-4 rounded-2xl">
        <button className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 w-full">
          <HeadphonesIcon size={16} />
          <span className="text-xs font-bold">Contact Admin</span>
        </button>
      </div>
    </aside>
  );
}
