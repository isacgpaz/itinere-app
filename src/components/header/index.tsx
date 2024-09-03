import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Header({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn("px-8 h-1/4 rounded-b-3xl bg-sky-950 pt-10", className)}
      {...props}
    >
      <div className="max-w-lg mx-auto flex flex-col items-center gap-6">
        {children}
      </div>
    </header>
  );
}
