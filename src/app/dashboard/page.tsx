import { AppShell } from "@/components/layout/app-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusBadge } from "@/components/ui/status-badge";

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard" subtitle="Overview">
      <div className="grid gap-4 xl:grid-cols-4">
        {[
          ["Offers created", "128", "+12.4% this month"],
          ["Accepted rate", "74%", "+4.1% from last month"],
          ["Revenue quoted", "$54.2k", "+8.8% growth"],
          ["Avg. response time", "9m", "-2m faster"]
        ].map(([label, value, trend]) => (
          <GlassCard key={label} className="p-5 transition hover:-translate-y-1 hover:shadow-lift">
            <p className="text-sm text-slate-500">{label}</p>
            <h3 className="mt-3 text-3xl font-semibold text-slate-900">{value}</h3>
            <p className="mt-6 text-sm text-emerald-700">{trend}</p>
          </GlassCard>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Recent offers</p>
              <h3 className="text-xl font-semibold text-slate-900">Latest activity</h3>
            </div>
          </div>

          <div className="space-y-3">
            {[
              ["VQ-2401", "Nordic Build AB", "$4,850", "draft"],
              ["VQ-2402", "Studio Vera", "$2,140", "sent"],
              ["VQ-2403", "Luma Clinic", "$8,200", "accepted"],
              ["VQ-2404", "Oakline Media", "$1,300", "rejected"]
            ].map(([id, client, total, status]) => (
              <div key={id} className="flex flex-col gap-3 rounded-2xl border border-white/55 bg-white/45 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">{client}</p>
                  <p className="text-sm text-slate-500">{id}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-medium text-slate-700">{total}</p>
                  <StatusBadge status={status as "draft" | "sent" | "accepted" | "rejected"} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <p className="text-sm text-slate-500">Quick start</p>
          <h3 className="mt-1 text-2xl font-semibold text-slate-900">Turn voice into a polished offer</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Upload audio, transcribe with AWS, refine line items, and export a premium quote PDF.
          </p>
        </GlassCard>
      </div>
    </AppShell>
  );
}
