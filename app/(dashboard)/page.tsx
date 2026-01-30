export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="bg-emerald-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold">Welcome back, Carsido! 👋</h1>
        <p className="opacity-90">Your dashboard is now clean and ready for work.</p>
      </div>
      
      {/* This is where your actual dashboard cards will go later */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 h-32">Stats Card 1</div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 h-32">Stats Card 2</div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 h-32">Stats Card 3</div>
      </div>
    </div>
  );
}