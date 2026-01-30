import { redirect } from "next/navigation";

export default function Home() {
  // This immediately sends anyone hitting your site 
  // straight into your HOA Portal layout
  redirect("/client/dashboard");
}