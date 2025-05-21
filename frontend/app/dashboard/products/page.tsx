import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ProductsTable } from "@/components/dashboard/products-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ProductsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Products" text="Manage your store's product inventory.">
        <Link href="/dashboard/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </DashboardHeader>
      <ProductsTable />
    </DashboardShell>
  )
}
