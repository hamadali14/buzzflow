import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.56))] shadow-glass backdrop-blur-xl",
        className
      )}
      {...props}
    />
  );
}
