import { AppShell } from "@/components/layout/app-shell";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const rows = [
  { id: "VQ-2401", client: "Nordic Build AB", date: "2026-04-20", amount: "$4,850", status: "draft" as const },
  { id: "VQ-2402", client: "Studio Vera", date: "2026-04-19", amount: "$2,140", status: "sent" as const },
  { id: "VQ-2403", client: "Luma Clinic", date: "2026-04-18", amount: "$8,200", status: "accepted" as const },
  { id: "VQ-2404", client: "Oakline Media", date: "2026-04-16", amount: "$1,300", status: "rejected" as const }
];

export default function OffersPage() {
  return (
    <AppShell title="Offers" subtitle="All offers">
      <div className="mb-4 flex flex-wrap gap-3">
        <Button>All</Button>
        <Button variant="secondary">Draft</Button>
        <Button variant="secondary">Sent</Button>
        <Button variant="secondary">Accepted</Button>
      </div>

      <Table>
        <THead>
          <TR>
            <TH>ID</TH>
            <TH>Client</TH>
            <TH>Date</TH>
            <TH>Amount</TH>
            <TH>Status</TH>
            <TH>Action</TH>
          </TR>
        </THead>
        <TBody>
          {rows.map((row) => (
            <TR key={row.id}>
              <TD>{row.id}</TD>
              <TD>{row.client}</TD>
              <TD>{row.date}</TD>
              <TD>{row.amount}</TD>
              <TD><StatusBadge status={row.status} /></TD>
              <TD><Button variant="ghost">Open</Button></TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </AppShell>
  );
}
