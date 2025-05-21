import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

const page = () => {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Overview of your store's performance and recent activity." />
      <DashboardOverview />
    </DashboardShell>
  )
}

export default page