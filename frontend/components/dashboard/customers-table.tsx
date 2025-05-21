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
import { MoreHorizontal, Search, Filter, Download, User, Mail, ShoppingBag, Ban } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Sample data
const customers = [
  {
    id: "CUST-001",
    name: "Alex Johnson",
    email: "alex@example.com",
    status: "active",
    orders: 12,
    spent: "$1,245.89",
    lastOrder: "2023-05-15T14:20:00",
  },
  {
    id: "CUST-002",
    name: "Sarah Williams",
    email: "sarah@example.com",
    status: "active",
    orders: 8,
    spent: "$879.50",
    lastOrder: "2023-05-12T09:15:00",
  },
  {
    id: "CUST-003",
    name: "Michael Brown",
    email: "michael@example.com",
    status: "active",
    orders: 5,
    spent: "$432.75",
    lastOrder: "2023-05-10T16:40:00",
  },
  {
    id: "CUST-004",
    name: "Emily Davis",
    email: "emily@example.com",
    status: "inactive",
    orders: 3,
    spent: "$215.30",
    lastOrder: "2023-04-28T11:20:00",
  },
  {
    id: "CUST-005",
    name: "David Wilson",
    email: "david@example.com",
    status: "active",
    orders: 7,
    spent: "$654.20",
    lastOrder: "2023-05-08T15:45:00",
  },
  {
    id: "CUST-006",
    name: "Jennifer Taylor",
    email: "jennifer@example.com",
    status: "active",
    orders: 9,
    spent: "$921.75",
    lastOrder: "2023-05-14T10:30:00",
  },
  {
    id: "CUST-007",
    name: "Robert Martinez",
    email: "robert@example.com",
    status: "blocked",
    orders: 2,
    spent: "$189.99",
    lastOrder: "2023-03-20T14:20:00",
  },
  {
    id: "CUST-008",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    status: "active",
    orders: 6,
    spent: "$567.40",
    lastOrder: "2023-05-05T09:15:00",
  },
  {
    id: "CUST-009",
    name: "Daniel Thomas",
    email: "daniel@example.com",
    status: "inactive",
    orders: 4,
    spent: "$345.60",
    lastOrder: "2023-04-15T16:40:00",
  },
  {
    id: "CUST-010",
    name: "Michelle Garcia",
    email: "michelle@example.com",
    status: "active",
    orders: 11,
    spent: "$1,102.30",
    lastOrder: "2023-05-17T11:20:00",
  },
]

export function CustomersTable() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Function to render status badge with appropriate color
  const renderStatus = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-50">
            Inactive
          </Badge>
        )
      case "blocked":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50">
            Blocked
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
      year: "numeric",
    }).format(date)
  }

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
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
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Spent</TableHead>
              <TableHead className="hidden sm:table-cell">Last Order</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-xs text-muted-foreground">{customer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{renderStatus(customer.status)}</TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>{customer.spent}</TableCell>
                  <TableCell className="hidden sm:table-cell">{formatDate(customer.lastOrder)}</TableCell>
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
                          <User className="mr-2 h-4 w-4" />
                          <span>View profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Send email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          <span>View orders</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Ban className="mr-2 h-4 w-4" />
                          <span>Block customer</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
