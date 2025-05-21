"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, PackageCheck, XCircle, Search, Download, Filter } from "lucide-react"

// Sample data - more orders for the dedicated orders page
const orders = [
  {
    id: "ORD-7352",
    customer: "Alex Johnson",
    email: "alex@example.com",
    product: "Oversized Cotton Shirt (2), High-Waist Jeans (1)",
    total: "$159.97",
    status: "processing",
    date: "2023-05-19T03:24:00",
  },
  {
    id: "ORD-7351",
    customer: "Sarah Williams",
    email: "sarah@example.com",
    product: "Relaxed Fit Blazer (1)",
    total: "$89.99",
    status: "shipped",
    date: "2023-05-18T14:15:00",
  },
  {
    id: "ORD-7350",
    customer: "Michael Brown",
    email: "michael@example.com",
    product: "Knitted Sweater Vest (1), Leather Crossbody Bag (1)",
    total: "$125.98",
    status: "delivered",
    date: "2023-05-18T09:42:00",
  },
  {
    id: "ORD-7349",
    customer: "Emily Davis",
    email: "emily@example.com",
    product: "High-Waist Slim Jeans (2)",
    total: "$119.98",
    status: "cancelled",
    date: "2023-05-17T16:30:00",
  },
  {
    id: "ORD-7348",
    customer: "David Wilson",
    email: "david@example.com",
    product: "Relaxed Fit Blazer (1), Knitted Sweater Vest (1)",
    total: "$135.98",
    status: "processing",
    date: "2023-05-17T11:20:00",
  },
  {
    id: "ORD-7347",
    customer: "Jennifer Taylor",
    email: "jennifer@example.com",
    product: "Leather Crossbody Bag (1)",
    total: "$79.99",
    status: "delivered",
    date: "2023-05-16T15:45:00",
  },
  {
    id: "ORD-7346",
    customer: "Robert Martinez",
    email: "robert@example.com",
    product: "Oversized Cotton Shirt (1)",
    total: "$49.99",
    status: "shipped",
    date: "2023-05-16T10:30:00",
  },
  {
    id: "ORD-7345",
    customer: "Lisa Anderson",
    email: "lisa@example.com",
    product: "High-Waist Slim Jeans (1), Knitted Sweater Vest (1)",
    total: "$105.98",
    status: "processing",
    date: "2023-05-15T14:20:00",
  },
  {
    id: "ORD-7344",
    customer: "Daniel Thomas",
    email: "daniel@example.com",
    product: "Relaxed Fit Blazer (1)",
    total: "$89.99",
    status: "delivered",
    date: "2023-05-15T09:15:00",
  },
  {
    id: "ORD-7343",
    customer: "Michelle Garcia",
    email: "michelle@example.com",
    product: "Leather Crossbody Bag (1), Oversized Cotton Shirt (1)",
    total: "$129.98",
    status: "shipped",
    date: "2023-05-14T16:40:00",
  },
]

export function OrdersTable() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Function to render status badge with appropriate color
  const renderStatus = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-50">
            Shipped
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">
            Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Products</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>{order.customer}</div>
                    <div className="text-xs text-muted-foreground">{order.email}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="text-sm">{order.product}</div>
                  </TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{renderStatus(order.status)}</TableCell>
                  <TableCell className="hidden sm:table-cell">{formatDate(order.date)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <PackageCheck className="mr-2 h-4 w-4" />
                          <span>Update status</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <XCircle className="mr-2 h-4 w-4" />
                          <span>Cancel order</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
