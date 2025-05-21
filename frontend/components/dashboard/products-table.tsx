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
import { MoreHorizontal, Search, Plus, Filter, Edit, Trash2, Eye } from "lucide-react"

// Sample data
const products = [
  {
    id: "PRD-1234",
    name: "Oversized Cotton Shirt",
    category: "Women",
    price: "$49.99",
    stock: 124,
    status: "In Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "PRD-1235",
    name: "High-Waist Slim Jeans",
    category: "Women",
    price: "$59.99",
    stock: 89,
    status: "In Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "PRD-1236",
    name: "Relaxed Fit Blazer",
    category: "Men",
    price: "$89.99",
    stock: 56,
    status: "In Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "PRD-1237",
    name: "Knitted Sweater Vest",
    category: "Women",
    price: "$45.99",
    stock: 12,
    status: "Low Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "PRD-1238",
    name: "Leather Crossbody Bag",
    category: "Accessories",
    price: "$79.99",
    stock: 34,
    status: "In Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "PRD-1239",
    name: "Slim Fit Chino Pants",
    category: "Men",
    price: "$54.99",
    stock: 67,
    status: "In Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "PRD-1240",
    name: "Floral Print Dress",
    category: "Women",
    price: "$65.99",
    stock: 23,
    status: "In Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "PRD-1241",
    name: "Classic Leather Belt",
    category: "Accessories",
    price: "$29.99",
    stock: 0,
    status: "Out of Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "PRD-1242",
    name: "Wool Blend Coat",
    category: "Women",
    price: "$129.99",
    stock: 8,
    status: "Low Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "PRD-1243",
    name: "Casual Sneakers",
    category: "Footwear",
    price: "$69.99",
    stock: 45,
    status: "In Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export function ProductsTable() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Function to render status badge with appropriate color
  const renderStatus = (status: string, stock: number) => {
    switch (status) {
      case "In Stock":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">
            In Stock
          </Badge>
        )
      case "Low Stock":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-50">
            Low Stock
          </Badge>
        )
      case "Out of Stock":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50">
            Out of Stock
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
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
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-muted-foreground">{product.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                  <TableCell>{renderStatus(product.status, product.stock)}</TableCell>
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
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit product</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete product</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
