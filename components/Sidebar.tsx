import { 
  LayoutDashboard, 
  CreditCard, 
  Megaphone, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Vote, // Changed from Poll to Vote
  User,
  Settings,
  Users,
  ShieldCheck,
  HeadphonesIcon
} from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', active: true },
    { icon: <CreditCard size={18} />, label: 'Payments' },
    { icon: <Megaphone size={18} />, label: 'Announcements' },
    { icon: <Calendar size={18} />, label: 'Events' },
    { icon: <FileText size={18} />, label: 'Documents' },
    { icon: <MessageSquare size={18} />, label: 'Messages' },
    { icon: <Vote size={18} />, label: 'Polls' }, // Updated icon here too
  ];

  return (
    <aside className="w-64 bg-white h-screen border-r border-slate-100 flex flex-col p-6 sticky top-0">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h1 className="font-bold text-slate-800 leading-none">HOA Portal</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Community Management</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <div 
            key={item.label}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
              item.active 
                ? 'bg-emerald-50 text-emerald-600 font-bold' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
        
        <div className="pt-8 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Admin Tools
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 cursor-pointer">
          <Users size={18} />
          <span className="text-sm">Manage Residents</span>
        </div>
      </nav>

      <div className="mt-auto p-4 bg-slate-50 rounded-2xl">
        <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Need help?</p>
        <button className="flex items-center gap-2 text-sm font-bold text-slate-700">
          <HeadphonesIcon size={16} /> Contact Admin
        </button>
      </div>
    </aside>
  );
}