"use client";

import { useState } from "react";
import { CreditCard, Settings2, Megaphone, FileText, CheckCircle2, Save, Plus } from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("payments");

  const tabs = [
    { id: "payments", label: "Payments", icon: <CreditCard size={16} /> },
    { id: "dues", label: "Dues", icon: <Settings2 size={16} /> },
    { id: "announce", label: "Announce", icon: <Megaphone size={16} /> },
    { id: "documents", label: "Documents", icon: <FileText size={16} /> },
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Admin Settings</h1>
        <p className="text-sm text-slate-500">Manage HOA settings, payments, and content</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-slate-100/50 p-1.5 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm min-h-[400px]">
        
        {/* PAYMENTS TAB */}
        {activeTab === "payments" && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Pending Payment Verifications</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-md">
              Review and verify submitted payment receipts. Currently, all payments have been verified.
            </p>
          </div>
        )}

        {/* DUES TAB */}
        {activeTab === "dues" && (
          <div className="space-y-8">
            <section>
              <h3 className="font-bold text-slate-800 mb-4">Dues Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Monthly Dues Amount (₱)</label>
                  <input type="number" defaultValue="300" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Due Day (Day of Month)</label>
                  <input type="number" defaultValue="15" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl" />
                </div>
              </div>
            </section>
            
            <section className="pt-8 border-t border-slate-50">
              <h3 className="font-bold text-slate-800 mb-4">Payment Methods</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">GCash Number</label>
                  <input type="text" defaultValue="0912049237" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Bank Details</label>
                  <textarea rows={3} defaultValue="BDO Savings Account\nAccount Name: HOA Association\nAccount Number: 1234-5678-9012" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl" />
                </div>
              </div>
            </section>

            <div className="flex justify-end pt-4">
              <button className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm">
                <Save size={18} /> Save Settings
              </button>
            </div>
          </div>
        )}

        {/* ANNOUNCE TAB */}
        {activeTab === "announce" && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-bold text-slate-800">Post Announcement</h3>
                <p className="text-xs text-slate-400">Create announcements for the community</p>
              </div>
              <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-xs">
                <Plus size={16} /> New Announcement
              </button>
            </div>
            <div className="py-20 text-center text-slate-400 text-sm">No announcements posted yet.</div>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-bold text-slate-800">Upload Document</h3>
                <p className="text-xs text-slate-400">Add documents for residents to access</p>
              </div>
              <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-xs">
                <Plus size={16} /> Upload Document
              </button>
            </div>
            <div className="py-20 text-center text-slate-400 text-sm">No documents uploaded.</div>
          </div>
        )}

      </div>
    </div>
  );
}
