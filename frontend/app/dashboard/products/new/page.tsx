import { ProductForm } from "@/components/dashboard/product-form"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default function NewProductPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Add New Product" text="Create a new product for your store." />
      <ProductForm />
    </DashboardShell>
  )
}
