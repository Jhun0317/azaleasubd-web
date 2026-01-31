"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CreditCard, 
  Megaphone, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Vote, 
  User, 
  Settings,
  HeadphonesIcon
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', href: '/' },
    { icon: <CreditCard size={18} />, label: 'Payments', href: '/client/payments' },
    { icon: <Megaphone size={18} />, label: 'Announcements', href: '/announcements' },
    { icon: <Calendar size={18} />, label: 'Events', href: '/events' },
    { icon: <FileText size={18} />, label: 'Documents', href: '/documents' },
    { icon: <MessageSquare size={18} />, label: 'Messages', href: '/messages' },
    { icon: <Vote size={18} />, label: 'Polls', href: '/polls' },
    { icon: <User size={18} />, label: 'Profile', href: '/profile' },
  ];

  return (
    <aside className="w-64 bg-white h-screen border-r border-slate-100 flex flex-col p-6 sticky top-0">
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">H</div>
        <div>
          <h1 className="text-sm font-bold text-slate-800">HOA Portal</h1>
          <p className="text-[10px] text-slate-400">Community Management</p>
        </div>
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-emerald-50 text-emerald-600 font-bold' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* HELP CARD (Matching your screenshot) */}
      <div className="mt-auto bg-slate-50 p-4 rounded-2xl">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Need help?</p>
        <button className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition-colors">
          <HeadphonesIcon size={16} />
          <span className="text-xs font-bold">Contact Admin</span>
        </button>
      </div>
    </aside>
  );
}
