"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingCart, Package, Users, BarChart, Settings, HelpCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DashboardNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      title: "Products",
      href: "/dashboard/products",
      icon: Package,
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: Users,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className="grid items-start gap-2 p-4">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn("w-full justify-start", pathname === item.href ? "bg-muted font-medium" : "font-normal")}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
      <div className="mt-auto">
        <Button variant="ghost" className="w-full justify-start font-normal">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help & Support
        </Button>
      </div>
    </nav>
  )
}
