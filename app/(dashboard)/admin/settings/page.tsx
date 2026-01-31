"use client";
import { useState } from 'react';
import { Save, Smartphone, Shield, Bell, Info } from 'lucide-react';

export default function AdminSettings() {
  const [gcashNumber, setGcashNumber] = useState("09123456789");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // This will later call a Server Action to update your 'GlobalSettings' table
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings updated successfully!");
    }, 1000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-800">System Settings</h1>
        <p className="text-slate-500 text-sm">Configure global portal details and payment information.</p>
      </div>

      <div className="grid gap-6">
        {/* PAYMENT CONFIGURATION */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Smartphone size={20} />
            </div>
            <h2 className="font-bold text-slate-800">Payment Details</h2>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
              Official GCash Number
            </label>
            <input 
              type="text" 
              value={gcashNumber}
              onChange={(e) => setGcashNumber(e.e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono text-lg"
            />
            <p className="mt-2 text-[11px] text-slate-400 flex items-center gap-1 px-1">
              <Info size={12} /> This number is displayed to all residents on the Payments page.
            </p>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-900 transition-all flex items-center gap-2 shadow-lg shadow-slate-200 disabled:opacity-50"
          >
            <Save size={18} />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}