import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. Add a fixed width to ensure it doesn't shrink */}
      <div className="w-64 flex-shrink-0">
        <Sidebar /> 
      </div>

      {/* 2. flex-1 ensures the main content takes the REST of the space */}
      <main className="flex-1 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
