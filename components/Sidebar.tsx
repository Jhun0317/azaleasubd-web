<nav className="flex-1 space-y-2">
  {/* Main Menu Items (Visible to Everyone) */}
  {menuItems.map((item) => {
    const isActive = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
    return (
      <Link 
        key={item.href} 
        href={item.href}
        onClick={onItemClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          isActive ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-slate-500 hover:bg-slate-50'
        }`}
      >
        {item.icon}
        <span className="text-sm">{item.label}</span>
      </Link>
    );
  })}

  {/* 1. PAYMENT SUMMARY: Updated Title and Phase Names */}
  <div className="mt-4 pt-4 border-t border-slate-50">
    <div className="flex items-center gap-2 px-4 mb-3">
      <PieChart size={12} className="text-slate-400" />
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payment Summary</p>
    </div>
    
    <div className="space-y-2 px-2">
      {[
        { phase: "Phase 1", color: "bg-emerald-500" },
        { phase: "Phase 2a/Phase 2c-ext", color: "bg-blue-500" },
        { phase: "Phase 2b/2c", color: "bg-purple-500" },
      ].map((item) => (
        <div key={item.phase} className="flex items-center justify-between p-2.5 bg-slate-50/50 rounded-xl border border-transparent hover:border-slate-100 transition-all">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
            <span className="text-[11px] font-bold text-slate-700">{item.phase}</span>
          </div>
          <span className="text-[10px] font-medium text-slate-400">₱0.00</span>
        </div>
      ))}
    </div>
  </div>

  {/* 2. ADMIN TOOLS: Locked to ADMIN only */}
  {userRole === "ADMIN" && (
    <div className="mt-6 pt-6 border-t border-slate-100">
      <div className="flex items-center gap-2 px-4 mb-4">
        <ShieldCheck size={12} className="text-slate-400" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin Tools</p>
      </div>
      {adminItems.map((item) => (
        <Link 
          key={item.href} 
          href={item.href}
          onClick={onItemClick}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            pathname === item.href ? 'bg-slate-800 text-white font-bold' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          {item.icon}
          <span className="text-sm">{item.label}</span>
        </Link>
      ))}
    </div>
  )}
</nav>
export default Sidebar;
