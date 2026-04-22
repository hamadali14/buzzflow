import { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function Textarea({ className, label, placeholder = " ", ...props }: Props) {
  return (
    <label className="group relative block">
      <textarea
        placeholder={placeholder}
        className={cn(
          "peer min-h-[140px] w-full rounded-2xl border border-white/55 bg-white/50 px-4 pb-4 pt-7 text-sm text-slate-900 shadow-soft outline-none backdrop-blur-md transition",
          "placeholder-transparent hover:bg-white/60 focus:border-sky-200 focus:bg-white/75 focus:shadow-glass",
          className
        )}
        {...props}
      />
      <span className="pointer-events-none absolute left-4 top-4 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-sm peer-focus:top-4 peer-focus:text-xs">
        {label}
      </span>
    </label>
  );
}
