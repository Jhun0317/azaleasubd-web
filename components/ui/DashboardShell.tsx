'use client';

import { ReactNode } from 'react';

export default function DashboardShell({ children, isAdmin }: { children: ReactNode; isAdmin: boolean }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full">
        <div className="p-6">
          <h1 className="text-xl font-bold text-emerald-600">HOA Portal</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium cursor-pointer">Dashboard</div>
          <div className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer">Payments</div>
          <div className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer">Announcements</div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
           <div className="text-slate-400">Search...</div>
           <div className="flex items-center gap-2">
             <span className="font-semibold text-slate-700">Carsido Joenel</span>
             <div className="w-8 h-8 bg-emerald-500 rounded-full"></div>
           </div>
        </header>
        {children}
      </main>
    </div>
  );
}