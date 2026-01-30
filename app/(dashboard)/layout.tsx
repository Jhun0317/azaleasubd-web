// If you have these files, make sure the names match exactly (e.g., sidebar.tsx vs Sidebar.tsx)
// import Sidebar from "@/components/Sidebar"; 
// import Navbar from "@/components/Navbar";   

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* TEMPORARY SIDEBAR PLACEHOLDER TO PREVENT BUILD ERROR */}
      <aside className="w-64 bg-white border-r border-slate-100 hidden md:block">
        <div className="p-6">
          <h2 className="text-[#10b981] font-bold text-xl">HOA Portal</h2>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">Community Management</p>
        </div>
        <nav className="mt-4 px-4 space-y-2">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-sm cursor-pointer">Dashboard</div>
          <div className="p-3 text-slate-500 hover:bg-slate-50 rounded-xl text-sm cursor-pointer">Payments</div>
          <div className="p-3 text-slate-500 hover:bg-slate-50 rounded-xl text-sm cursor-pointer">Announcements</div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP NAVBAR PLACEHOLDER */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8">
           <div className="text-sm text-slate-400 italic">Search...</div>
           <div className="flex items-center gap-3">
             <span className="text-sm font-bold text-slate-700">Carsido Joenel</span>
             <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs">CJ</div>
           </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}