// app/(dashboard)/layout.tsx
return (
  <Providers>
    <DashboardShell isAdmin={user.role === "admin"}>
      {children} {/* This renders the HOA content from your screenshot */}
    </DashboardShell>
  </Providers>
);