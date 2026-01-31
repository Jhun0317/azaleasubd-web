import Link from 'next/link';
import { usePathname } from 'next/navigation'; // To highlight the active link
// ... (keep your icons imports)

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', href: '/' },
    { icon: <CreditCard size={18} />, label: 'Payments', href: '/client/payments' },
    { icon: <Megaphone size={18} />, label: 'Announcements', href: '/announcements' },
    // Add the rest of your links here
  ];

  return (
    <aside className="w-64 bg-white h-screen border-r border-slate-100 flex flex-col p-6 sticky top-0">
      {/* ... (keep your logo header) */}

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
              pathname === item.href 
                ? 'bg-emerald-50 text-emerald-600 font-bold' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>
      {/* ... rest of sidebar */}
    </aside>
  );
}
