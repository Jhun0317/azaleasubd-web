import { cookies } from "next/headers";

export async function getAuthUser() {
  // NEXT.JS 16: cookies() is async
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) return null;

  return {
    id: "user_1",
    name: "Demo User",
    role: "user", // or "admin"
  };
}
