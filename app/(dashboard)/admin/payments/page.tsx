"use client";
import { useState } from 'react';
import { Check, X, Eye, Clock, ExternalLink, Filter, Search } from 'lucide-react';

export default function ReviewPayments() {
  // Sample Data - This will eventually be replaced by a database call
  const [payments, setPayments] = useState([
    { id: "PAY-101", resident: "Maria Clara", amount: 300, ref: "1234567890123", status: "Pending", date: "Jan 30, 2026" },
    { id: "PAY-102", resident: "Juan Dela Cruz", amount: 300, ref: "9876543210987", status: "Pending", date: "Jan 29, 2026" },
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Review Payments</h1>
        <p className="text-slate-500 text-sm">Verify GCash submissions and update resident accounts.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resident</th>
              <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ref Number</th>
              <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
              <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Screenshot</th>
              <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {payments.map((pay) => (
              <tr key={pay.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <p className="font-bold text-slate-800">{pay.resident}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">{pay.date}</p>
                </td>
                <td className="px-6 py-5">
                  <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 font-mono">{pay.ref}</code>
                </td>
                <td className="px-6 py-5">
                  <p className="font-bold text-slate-800">₱{pay.amount.toFixed(2)}</p>
                </td>
                <td className="px-6 py-5">
                  <button className="flex items-center gap-2 text-emerald-600 font-bold text-xs hover:underline">
                    <Eye size={14} /> View Receipt
                  </button>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm shadow-emerald-100">
                      <Check size={18} />
                    </button>
                    <button className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm shadow-rose-100">
                      <X size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}