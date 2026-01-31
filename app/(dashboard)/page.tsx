{/* QUICK ACTIONS SECTION */}
<div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
  <h3 className="font-bold text-slate-800 mb-6">Quick Actions</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
    {/* Action 1: Submit Payment */}
    <Link href="/client/payments" className="block">
      <button className="w-full flex items-center gap-4 p-5 border border-slate-100 rounded-2xl hover:bg-emerald-50 hover:border-emerald-100 transition-all text-left group">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <Wallet />
        </div>
        <div>
          <p className="font-bold text-slate-800">Submit Payment</p>
          <p className="text-xs text-slate-400">Pay your monthly dues</p>
        </div>
        <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-emerald-500" />
      </button>
    </Link>

    {/* Action 2: View Documents */}
    <Link href="/documents" className="block">
      <button className="w-full flex items-center gap-4 p-5 border border-slate-100 rounded-2xl hover:bg-blue-50 hover:border-blue-100 transition-all text-left group">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <FileText />
        </div>
        <div>
          <p className="font-bold text-slate-800">View Documents</p>
          <p className="text-xs text-slate-400">Access HOA files</p>
        </div>
        <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-blue-500" />
      </button>
    </Link>
    
  </div>
</div>
