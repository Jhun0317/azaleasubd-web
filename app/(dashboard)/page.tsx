import { Bell, Search, Wallet, FileText, Calendar, ChevronRight, Megaphone } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* HEADER: Search and Profile */}
      <header className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20" />
        </div>
        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">Carsido Joenel</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Admin</p>
            </div>
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold italic">CJ</div>
          </div>
        </div>
      </header>

      <main className="p-8 space-y-8">
        {/* WELCOME BANNER */}
        <section className="bg-emerald-500 rounded-[2rem] p-10 text-white shadow-lg shadow-emerald-200 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-black mb-2">Welcome back, Carsido! 👋</h1>
            <p className="opacity-90 font-medium">Stay updated with your community. Here's what's happening today.</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </section>

        {/* STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Unread Messages', value: '0', color: 'bg-orange-500' },
            { label: 'Upcoming Events', value: '0', color: 'bg-blue-500' },
            { label: 'Announcements', value: '5', color: 'bg-emerald-500' },
            { label: 'Payments Made', value: '0', color: 'bg-rose-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-slate-800">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 ${stat.color} rounded-xl opacity-20`}></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Actions & Announcements */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center gap-4 p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all text-left group">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"><Wallet /></div>
                  <div><p className="font-bold text-slate-800">Submit Payment</p><p className="text-xs text-slate-400">Pay your monthly dues</p></div>
                  <ChevronRight size={16} className="ml-auto text-slate-300" />
                </button>
                <button className="flex items-center gap-4 p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all text-left group">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"><FileText /></div>
                  <div><p className="font-bold text-slate-800">View Documents</p><p className="text-xs text-slate-400">Access HOA files</p></div>
                  <ChevronRight size={16} className="ml-auto text-slate-300" />
                </button>
              </div>
            </div>

            {/* RECENT ANNOUNCEMENTS */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">Recent Announcements</h3>
                <button className="text-emerald-500 font-bold text-sm">View All</button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                  <p className="font-bold text-rose-800 text-sm">Water Service Interruption Notice</p>
                  <p className="text-xs text-rose-600 mt-1">Scheduled maintenance on Jan 20, 2025.</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                  <p className="font-bold text-blue-800 text-sm">New Parking Guidelines</p>
                  <p className="text-xs text-blue-600 mt-1">Starting Feb 1, all residents must display stickers.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Payment Status */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">Payment Status</h3>
                <button className="text-emerald-500 font-bold text-xs uppercase tracking-widest">View History</button>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-6">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm"><Wallet size={18} className="text-slate-400" /></div>
                   <div><p className="text-[10px] font-bold text-slate-400 uppercase">January 2026 Dues</p><p className="font-black text-rose-500 uppercase text-xs tracking-widest">Unpaid</p></div>
                </div>
                <p className="text-3xl font-black text-slate-800">₱300.00</p>
                <p className="text-[10px] text-slate-400 mt-1">Due Date: Every 15th of the month</p>
              </div>
              <button className="w-full py-5 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100">Pay Now</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
