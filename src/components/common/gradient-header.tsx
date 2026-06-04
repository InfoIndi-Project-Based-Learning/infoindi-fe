import type React from "react";
import { cn } from "@/lib/utils";

export function GradientHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("bg-linear-to-r relative px-10 lg:px-80 min-h-[400px] flex flex-col justify-center gap-6 items-center from-blue-600 to-purple-600 text-white py-10 text-center", className)}>
      {children}
    </header>
  );
}
