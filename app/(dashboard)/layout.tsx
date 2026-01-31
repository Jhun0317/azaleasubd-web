import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* This renders your new "use client" Sidebar */}
      <Sidebar /> 

      {/* This area fills the rest of the screen and scrolls independently */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
