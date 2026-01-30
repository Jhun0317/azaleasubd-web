import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar /> {/* This is the only sidebar that should exist */}
      <div className="flex-1 flex flex-col">
        {/* Header content... */}
        <main className="p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}