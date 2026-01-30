import Providers from "../providers";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/ui/DashboardShell";
import { getAuthUser } from "../lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <Providers>
      <DashboardShell isAdmin={user.role === "admin"}>
        {children}
      </DashboardShell>
    </Providers>
  );
}
