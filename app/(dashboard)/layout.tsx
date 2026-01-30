import Providers from "../providers";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/ui/DashboardShell";
import { getAuthUser } from "../lib/auth"; // Ensure this path is correct

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. You MUST fetch the user here
  const user = await getAuthUser();

  // 2. If no user, send them to login
  if (!user) {
    redirect("/login");
  }

  // 3. Now 'user' exists and you can check user.role
  return (
    <Providers>
      <DashboardShell isAdmin={user.role === "admin"}>
        {children}
      </DashboardShell>
    </Providers>
  );
}