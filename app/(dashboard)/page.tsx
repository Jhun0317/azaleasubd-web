import { CreditCard, FileText, MessageSquare, Calendar, ChevronRight, Bell } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* VERIFICATION BAR - This will prove we are in the right file */}
      <div className="bg-yellow-200 p-6 border-4 border-red-600 rounded-xl">
        <h1 className="text-4xl text-red-600 font-black text-center">
          LIVE TEST: FILE UPDATED SUCCESSFULLY
        </h1>
      </div>

      <div className="bg-[#10b981] rounded-[2rem] p-10 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Carsido! 👋</h1>
        <p className="opacity-90 font-medium">Villa Azalea Subdivision Portal</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <CreditCard size={18} className="text-emerald-600"/>
                  </div>
                  <span className="text-sm font-bold text-slate-700">Submit Payment</span>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <FileText size={18} className="text-blue-600"/>
                  </div>
                  <span className="text-sm font-bold text-slate-700">View Documents</span>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-fit">
          <h3 className="font-bold text-slate-800 mb-6">Account Status</h3>
          <div className="p-6 bg-emerald-50 rounded-2xl text-center mb-6">
            <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Balance Due</p>
            <p className="text-3xl font-black text-emerald-700">₱0.00</p>
          </div>
          <button className="w-full py-4 bg-[#10b981] text-white rounded-2xl font-bold hover:bg-emerald-600 transition-colors">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}