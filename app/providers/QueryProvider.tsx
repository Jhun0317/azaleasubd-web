"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState, useEffect } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient, setQueryClient] = useState<QueryClient | null>(null);

  useEffect(() => {
    setQueryClient(new QueryClient());
  }, []);

  if (!queryClient) {
    return null; // ⛔ prevent build-time execution
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
    );
}
