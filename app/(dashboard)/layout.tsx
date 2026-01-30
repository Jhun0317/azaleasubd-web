import Sidebar from "@/components/Sidebar"; // Adjust path to your Sidebar component
import Navbar from "@/components/Navbar";   // Adjust path to your Navbar component

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* LEFT SIDEBAR */}
      <Sidebar /> 

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP NAVBAR */}
        <Navbar />

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