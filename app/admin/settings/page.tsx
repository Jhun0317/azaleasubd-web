"use client";

import { Save, Building2, Wallet, BellRing } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header Section */}
      <div className="flex flex-col gap-2 px-2">
        <h1 className="text-2xl font-bold text-slate-900">Admin Settings</h1>
        <p className="text-sm text-slate-500">Manage your community's global preferences and rules.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Card 1: Community Profile */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Building2 size={20} />
            </div>
            <h2 className="font-semibold text-slate-800">Community Profile</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">HOA Name</label>
              <input 
                type="text" 
                placeholder="Azalea Subdivision"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Email</label>
              <input 
                type="email" 
                placeholder="admin@azalea.com"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Financial Settings */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Wallet size={20} />
            </div>
            <h2 className="font-semibold text-slate-800">Billing & Fees</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Dues (₱)</label>
              <input 
                type="number" 
                placeholder="1500"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Late Penalty (%)</label>
              <input 
                type="number" 
                placeholder="5"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Save Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:static lg:flex lg:justify-end lg:mt-6">
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full lg:rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-all active:scale-95">
          <Save size={18} />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}