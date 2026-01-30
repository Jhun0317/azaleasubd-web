import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* THIS IS THE ONLY SIDEBAR THAT SHOULD EXIST */}
      <Sidebar /> 

      <div className="flex-1 flex flex-col">
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-20">
           <div className="text-sm text-slate-400">Search...</div>
           <div className="flex items-center gap-3">
             <div className="text-right">
               <p className="text-xs font-bold text-slate-700 leading-none">Carsido Joenel</p>
               <p className="text-[10px] text-slate-400">Resident</p>
             </div>
             <div className="w-9 h-9 bg-emerald-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">
               CJ
             </div>
           </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}