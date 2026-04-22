import { ReactNode } from "react";

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/55 bg-white/55 shadow-glass backdrop-blur-xl">
      <table className="min-w-full text-left">{children}</table>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className="bg-white/45 text-xs uppercase tracking-wide text-slate-500">{children}</thead>;
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-white/45">{children}</tbody>;
}

export function TR({ children }: { children: ReactNode }) {
  return <tr className="transition hover:bg-white/45">{children}</tr>;
}

export function TH({ children }: { children: ReactNode }) {
  return <th className="px-5 py-4 font-medium">{children}</th>;
}

export function TD({ children }: { children: ReactNode }) {
  return <td className="px-5 py-4 text-sm text-slate-700">{children}</td>;
}
