import { AppShell } from "@/components/layout/app-shell";
import { GlassCard } from "@/components/ui/glass-card";

export default function PreviewPage() {
  return (
    <AppShell title="PDF Preview" subtitle="Centered document view">
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <GlassCard className="flex min-h-[820px] items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-[820px] rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
            <div className="mb-10 flex items-start justify-between gap-6">
              <div>
                <p className="text-sm text-slate-500">Voice-to-Quote</p>
                <h2 className="text-3xl font-semibold text-slate-900">Offer VQ-2401</h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Issued</p>
                <p className="text-sm font-medium text-slate-900">2026-04-21</p>
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200">
              <table className="min-w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Item</th>
                    <th className="px-5 py-4">Qty</th>
                    <th className="px-5 py-4">Unit</th>
                    <th className="px-5 py-4">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-5 py-4 text-sm text-slate-700">Interior painting</td>
                    <td className="px-5 py-4 text-sm text-slate-700">24</td>
                    <td className="px-5 py-4 text-sm text-slate-700">$75</td>
                    <td className="px-5 py-4 text-sm text-slate-700">$1,800</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 text-sm text-slate-700">Floor installation</td>
                    <td className="px-5 py-4 text-sm text-slate-700">18</td>
                    <td className="px-5 py-4 text-sm text-slate-700">$95</td>
                    <td className="px-5 py-4 text-sm text-slate-700">$1,710</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="h-fit p-5">
          <p className="text-sm text-slate-500">Actions</p>
          <h3 className="text-xl font-semibold text-slate-900">Document controls</h3>
        </GlassCard>
      </div>
    </AppShell>
  );
}
