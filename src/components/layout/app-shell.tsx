import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export function AppShell({
  title,
  subtitle,
  children
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-shell p-4 text-slate-900">
      <div className="mx-auto grid max-w-[1600px] gap-4 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="rounded-[32px] border border-white/45 bg-white/35 p-4 shadow-glass backdrop-blur-xl sm:p-6 lg:min-h-[calc(100vh-2rem)] lg:p-8">
          <Topbar />
          {(title || subtitle) && (
            <div className="mb-6">
              {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
              {title ? <h1 className="text-3xl font-semibold text-slate-900">{title}</h1> : null}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
