const styles = {
  draft: "bg-white/70 text-slate-700 border-white/50",
  sent: "bg-sky-50/90 text-sky-700 border-sky-100",
  accepted: "bg-emerald-50/90 text-emerald-700 border-emerald-100",
  rejected: "bg-rose-50/90 text-rose-700 border-rose-100"
};

export function StatusBadge({
  status
}: {
  status: "draft" | "sent" | "accepted" | "rejected";
}) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize backdrop-blur-sm ${styles[status]}`}>
      {status}
    </span>
  );
}
