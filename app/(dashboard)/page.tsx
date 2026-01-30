import { CreditCard, FileText, Bell } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#10b981] rounded-3xl p-8 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Welcome back, Carsido! 👋</h1>
        <p className="opacity-90">Villa Azalea Subdivision Portal</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold mb-4 text-slate-800">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl flex items-center gap-3 border border-slate-100">
                <CreditCard className="text-emerald-500" />
                <span className="text-sm font-semibold text-slate-700">Payments</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl flex items-center gap-3 border border-slate-100">
                <Bell className="text-blue-500" />
                <span className="text-sm font-semibold text-slate-700">Notices</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit">
          <h3 className="font-bold mb-4 text-slate-800">Account Status</h3>
          <div className="p-4 bg-emerald-50 rounded-xl text-center mb-4">
            <p className="text-xs text-emerald-600 font-bold uppercase">Balance Due</p>
            <p className="text-2xl font-black text-emerald-700">₱0.00</p>
          </div>
          <button className="w-full py-3 bg-[#10b981] text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}