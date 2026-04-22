import { Search, ChevronDown } from "lucide-react";

export function Topbar() {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm text-slate-500">Premium Voice Workflow</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Welcome back</h2>
      </div>

      <div className="flex items-center gap-3">
        <label className="relative w-full lg:w-[340px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search offers, clients, transcripts..."
            className="h-12 w-full rounded-2xl border border-white/55 bg-white/60 pl-11 pr-4 text-sm text-slate-900 shadow-soft outline-none backdrop-blur-xl transition placeholder:text-slate-400 focus:border-sky-200 focus:shadow-glass"
          />
        </label>

        <button className="flex items-center gap-3 rounded-2xl border border-white/55 bg-white/60 px-3 py-2 shadow-soft backdrop-blur-xl transition hover:-translate-y-0.5">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-white to-sky-100" />
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-slate-900">Ahmed</p>
            <p className="text-xs text-slate-500">Founder</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>
      </div>
    </div>
  );
}
