import { AppShell } from "@/components/layout/app-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Workspace">
      <div className="grid gap-4 xl:grid-cols-2">
        <GlassCard className="p-5">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Brand settings</h3>
          <div className="grid gap-4">
            <Input label="Company name" defaultValue="Voice-to-Quote Studio" />
            <Input label="Primary email" defaultValue="premium@voicetoquote.com" />
            <Input label="Default currency" defaultValue="USD" />
          </div>
          <div className="mt-6">
            <Button>Save settings</Button>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">AWS setup</h3>
          <p className="text-sm text-slate-600">
            Use Amazon S3 for audio storage and Amazon Transcribe for speech-to-text.
          </p>
        </GlassCard>
      </div>
    </AppShell>
  );
}
