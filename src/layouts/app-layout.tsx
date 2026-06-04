import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <Toaster />
      {children}
    </QueryProvider>
  );
}
