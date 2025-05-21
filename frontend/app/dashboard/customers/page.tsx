import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { CustomersTable } from "@/components/dashboard/customers-table"

export default function CustomersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Customers" text="View and manage your customer base." />
      <CustomersTable />
    </DashboardShell>
  )
}
