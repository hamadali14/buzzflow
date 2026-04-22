import { AppShell } from "@/components/layout/app-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function OfferEditorPage() {
  return (
    <AppShell title="Offer Editor" subtitle="Edit draft VQ-2401">
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <GlassCard className="p-5">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Client details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Client name" defaultValue="Nordic Build AB" />
              <Input label="Contact person" defaultValue="Ali Hassan" />
              <Input label="Email" defaultValue="contact@nordicbuild.se" />
              <Input label="Phone" defaultValue="+46 70 000 00 00" />
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Offer details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Offer title" defaultValue="Renovation package" />
              <Input label="Valid until" defaultValue="2026-05-10" />
            </div>
            <div className="mt-4">
              <Textarea
                label="Description"
                defaultValue="Painting, floor replacement, and final cleanup based on the recorded client meeting."
              />
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Editable items</h3>
              <Button variant="secondary">Add Item</Button>
            </div>

            <div className="space-y-3">
              {[
                ["Interior painting", "24h", "$75", "$1,800"],
                ["Floor installation", "18h", "$95", "$1,710"],
                ["Cleanup & delivery", "6h", "$55", "$330"]
              ].map(([name, qty, price, total], i) => (
                <div key={i} className="grid gap-3 rounded-2xl border border-white/50 bg-white/40 p-4 md:grid-cols-4">
                  <Input label="Item" defaultValue={name} />
                  <Input label="Qty / Hours" defaultValue={qty} />
                  <Input label="Unit price" defaultValue={price} />
                  <Input label="Total" defaultValue={total} />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <GlassCard className="h-fit p-5 xl:sticky xl:top-8">
          <p className="text-sm text-slate-500">Summary</p>
          <h3 className="text-xl font-semibold text-slate-900">Offer total</h3>

          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-white/45 px-4 py-3">
              <span className="text-sm text-slate-600">Subtotal</span>
              <span className="text-sm font-medium text-slate-900">$3,840</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/45 px-4 py-3">
              <span className="text-sm text-slate-600">Tax</span>
              <span className="text-sm font-medium text-slate-900">$960</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/60 px-4 py-4">
              <span className="text-sm font-medium text-slate-700">Grand total</span>
              <span className="text-lg font-semibold text-slate-900">$4,800</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}