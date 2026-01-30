import { CreditCard, FileText, MessageSquare, Calendar, ChevronRight, Bell, Info } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* WELCOME BANNER */}
      <div className="relative overflow-hidden bg-[#10b981] rounded-[2rem] p-10 text-white shadow-lg shadow-emerald-500/10">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Carsido! 👋</h1>
          <p className="text-emerald-50 opacity-90">Stay updated with your community. Here's what's happening today.</p>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Unread Messages" value="0" icon={<MessageSquare className="text-orange-500" />} />
        <StatCard label="Upcoming Events" value="0" icon={<Calendar className="text-blue-500" />} />
        <StatCard label="Announcements" value="5" icon={<Bell className="text-emerald-500" />} />
        <StatCard label="Payments Made" value="0" icon={<CreditCard className="text-rose-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <QuickActions />
          
          {/* RECENT ANNOUNCEMENTS SECTION */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800">Recent Announcements</h3>
              <button className="text-emerald-600 text-sm font-semibold flex items-center gap-1">View All <ChevronRight size={14}/></button>
            </div>
            
            <div className="space-y-4">
              <AnnouncementItem 
                title="Water Service Interruption Notice" 
                date="Jan 16, 2026" 
                type="emergency" 
                desc="Please be advised that there will be a scheduled water service interruption..." 
              />
              <AnnouncementItem 
                title="New Parking Guidelines" 
                date="Jan 16, 2026" 
                type="info" 
                desc="Starting February 1, 2025, all residents must display their parking stickers..." 
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
           {/* PAYMENT STATUS CARD */}
           <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-slate-800">Payment Status</h3>
               <span className="text-emerald-600 text-xs font-bold cursor-pointer">View History</span>
             </div>
             <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl mb-6">
                <div className="p-3 bg-white rounded-xl shadow-sm"><CreditCard size={20} className="text-slate-600"/></div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">January 2026 Dues</p>
                  <p className="text-sm font-bold text-slate-700">Unpaid</p>
                </div>
             </div>
             <div className="flex justify-between items-end mb-6">
                <span className="text-xs text-slate-400">Monthly Amount</span>
                <span className="text-xl font-black text-slate-800">₱300</span>
             </div>
             <button className="w-full py-4 bg-[#10b981] text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
               <CreditCard size={18}/> Pay Now
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ label, value, icon }: { label: string, value: string, icon: any }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-black text-slate-800">{value}</p>
      </div>
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}

function AnnouncementItem({ title, date, type, desc }: any) {
  const isEmergency = type === 'emergency';
  return (
    <div className={`p-5 rounded-2xl border ${isEmergency ? 'bg-rose-50/30 border-rose-100' : 'bg-blue-50/30 border-blue-100'}`}>
      <div className="flex gap-4">
        <div className={`mt-1 ${isEmergency ? 'text-rose-500' : 'text-blue-500'}`}><Info size={18}/></div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">{title}</h4>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{desc}</p>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">{date}</p>
        </div>
      </div>
    </div>
  );
}

function QuickActions() {
    const actions = [
      { title: "Submit Payment", desc: "Pay your monthly dues", icon: <CreditCard className="text-emerald-600" />, color: "bg-emerald-50" },
      { title: "View Documents", desc: "Access HOA files", icon: <FileText className="text-blue-600" />, color: "bg-blue-50" },
      { title: "Send Message", desc: "Contact admin", icon: <MessageSquare className="text-purple-600" />, color: "bg-purple-50" },
      { title: "View Events", desc: "Check calendar", icon: <Calendar className="text-orange-600" />, color: "bg-orange-50" }
    ];
  
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action, i) => (
            <div key={i} className="group flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:border-emerald-100 hover:bg-slate-50/50 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>{action.icon}</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-700">{action.title}</h4>
                  <p className="text-xs text-slate-400">{action.desc}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-500" />
            </div>
          ))}
        </div>
      </div>
    );
}