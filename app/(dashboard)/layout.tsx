import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Far Left Sidebar stays here */}
      <Sidebar /> 

      <main className="flex-1">
        {/* Everything from page.tsx appears here */}
        {children}
      </main>
    </div>
  );
}