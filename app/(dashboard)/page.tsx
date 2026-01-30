import { CreditCard, FileText, MessageSquare, Calendar, ChevronRight, Bell, Info } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* 1. WELCOME BANNER */}
      <div className="relative overflow-hidden bg-[#10b981] rounded-[2rem] p-10 text-white shadow-lg">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Carsido! 👋</h1>
          <p className="opacity-90">Stay updated with your community. Here's what's happening today.</p>
        </div>
      </div>

      {/* 2. STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase">Unread Messages</p>
            <p className="text-3xl font-black text-slate-800">0</p>
          </div>
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center"><MessageSquare className="text-orange-500" size={20} /></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase">Upcoming Events</p>
            <p className="text-3xl font-black text-slate-800">0</p>
          </div>
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center"><Calendar className="text-blue-500" size={20} /></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase">Announcements</p>
            <p className="text-3xl font-black text-slate-800">5</p>
          </div>
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center"><Bell className="text-emerald-500" size={20} /></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase">Payments Made</p>
            <p className="text-3xl font-black text-slate-800">0</p>
          </div>
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center"><CreditCard className="text-rose-500" size={20} /></div>
        </div>
      </div>

      {/* 3. CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-slate-50/30 cursor-pointer hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center"><CreditCard size={18} className="text-emerald-600"/></div>
                    <div><p className="text-sm font-bold text-slate-700">Submit Payment</p></div>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
               </div>
               <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-slate-50/30 cursor-pointer hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><FileText size={18} className="text-blue-600"/></div>
                    <div><p className="text-sm font-bold text-slate-700">View Documents</p></div>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
               </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm h-fit">
          <h3 className="font-bold text-slate-800 mb-6">Payment Status</h3>
          <div className="p-5 bg-emerald-50/50 rounded-2xl mb-6 border border-emerald-100 text-center">
            <p className="text-[10px] text-emerald-600 font-bold uppercase mb-1">Current Balance</p>
            <p className="text-3xl font-black text-emerald-700">₱0.00</p>
          </div>
          <button className="w-full py-4 bg-[#10b981] text-white rounded-2xl font-bold hover:bg-emerald-600 transition-colors">Pay Now</button>
        </div>
      </div>
    </div>
  );
}