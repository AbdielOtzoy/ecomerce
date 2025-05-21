import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { OrdersTable } from "@/components/dashboard/orders-table";


export default function OrdersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Orders" text="View and manage customer orders." />
      <OrdersTable />
    </DashboardShell>
  )
}
