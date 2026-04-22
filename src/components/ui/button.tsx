import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "bg-white/80 text-slate-900 border-white/70 shadow-glass hover:-translate-y-0.5 hover:shadow-lift",
  secondary:
    "bg-white/45 text-slate-800 border-white/50 hover:bg-white/60 hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-slate-700 border-transparent hover:bg-white/45 hover:border-white/45"
};

export function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium transition duration-200 active:scale-[0.985] disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
