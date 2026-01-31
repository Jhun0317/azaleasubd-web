"use client";
import { useState } from 'react';
import { Wallet, Copy, CheckCircle2, Info, Upload } from 'lucide-react';

export default function PaymentsPage() {
  const [copied, setCopied] = useState(false);
  const adminGcashNumber = "09123456789"; // This can be pulled from your database later

  const handleCopy = () => {
    navigator.clipboard.writeText(adminGcashNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Monthly Dues</h1>
        <p className="text-slate-500">View and settle your community payments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Payment Details */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Amount Due</p>
            <p className="text-4xl font-black text-slate-800 mb-6">₱300.00</p>
            
            <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 items-start border border-blue-100">
              <Info className="text-blue-500 shrink-0" size={18} />
              <p className="text-xs text-blue-700 leading-relaxed">
                Please pay exactly the amount shown. Payments are usually verified by the Admin within 24 hours.
              </p>
            </div>
          </div>

          <div className="bg-emerald-500 p-8 rounded-[2.5rem] text-white shadow-lg shadow-emerald-100">
            <h3 className="font-bold mb-4">Pay via GCash</h3>
            <p className="text-sm opacity-90 mb-6">Send your payment to the official HOA GCash number below:</p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/20">
              <div>
                <p className="text-[10px] font-bold uppercase opacity-70">GCash Account Number</p>
                <p className="text-xl font-mono font-bold tracking-tighter">{adminGcashNumber}</p>
              </div>
              <button 
                onClick={handleCopy}
                className="p-3 bg-white text-emerald-600 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Proof of Payment Form */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6">Submit Proof of Payment</h3>
          
          <div className="space-y-4 flex-1">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2 px-1">Reference Number</label>
              <input 
                type="text" 
                placeholder="Enter the 13-digit GCash Ref #" 
                className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm"
              />
            </div>

            <div className="border-2 border-dashed border-slate-100 rounded-3xl p-8 text-center hover:border-emerald-200 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                <Upload size={20} />
              </div>
              <p className="text-xs font-bold text-slate-500">Upload Receipt Screenshot</p>
              <p className="text-[10px] text-slate-300 mt-1">PNG or JPG up to 5MB</p>
            </div>
          </div>

          <button className="w-full py-5 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-900 transition-all mt-8">
            Confirm Payment Submission
          </button>
        </div>
      </div>
    </div>
  );
}
