export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar removed completely to stop build errors */}
      <main>{children}</main>
    </div>
  );
}