import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* This is your REAL Sidebar from the components folder */}
      <Sidebar isOpen={true} onClose={() => {}} /> 

      <div className="flex-1 flex flex-col">
        <main className="p-8">
          <div className="max-w-6xl mx-auto">
            {/* This is where your page content (Payments, etc.) goes */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}