"use client"

import { ArrowDown, ArrowUp, DollarSign, ShoppingBag, Users, Package } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { TopProducts } from "@/components/dashboard/top-products"

export function DashboardOverview() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <ArrowUp className="mr-1 h-4 w-4" />
                <span>18.2%</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <p className="text-xs text-muted-foreground">+10.5% from last month</p>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <ArrowUp className="mr-1 h-4 w-4" />
                <span>12.3%</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">+5.2% from last month</p>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <ArrowUp className="mr-1 h-4 w-4" />
                <span>7.4%</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inventory</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,234</div>
              <p className="text-xs text-muted-foreground">143 products low in stock</p>
              <div className="mt-4 flex items-center text-sm text-red-600">
                <ArrowDown className="mr-1 h-4 w-4" />
                <span>3 products out of stock</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Daily sales revenue for the past 30 days</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <SalesChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best selling products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <TopProducts />
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics" className="h-[400px] flex items-center justify-center text-muted-foreground">
        Detailed analytics dashboard coming soon...
      </TabsContent>
      <TabsContent value="reports" className="h-[400px] flex items-center justify-center text-muted-foreground">
        Reports dashboard coming soon...
      </TabsContent>
    </Tabs>
  )
}
