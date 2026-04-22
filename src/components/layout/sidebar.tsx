import Link from "next/link";
import { LayoutDashboard, FilePlus2, Files, Settings, Mic2 } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/new-offer", label: "New Offer", icon: FilePlus2 },
  { href: "/offers", label: "Offers", icon: Files },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  return (
    <aside className="w-full rounded-[32px] border border-white/50 bg-white/55 p-4 shadow-glass backdrop-blur-xl lg:h-[calc(100vh-2rem)] lg:w-[280px] lg:sticky lg:top-4">
      <div className="mb-8 flex items-center gap-3 px-2 pt-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/60 shadow-soft">
          <Mic2 className="h-5 w-5 text-slate-800" />
        </div>
        <div>
          <p className="text-sm text-slate-500">Voice-to-Quote</p>
          <h1 className="text-lg font-semibold text-slate-900">Premium Suite</h1>
        </div>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-white/50 hover:bg-white/50 hover:-translate-y-0.5 hover:shadow-soft"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
