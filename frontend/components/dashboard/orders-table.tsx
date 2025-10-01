"use client"

import { useEffect, useState } from "react"
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
import { ClothingOrder } from "@/types"

export function OrdersTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [orders, setOrders] = useState<ClothingOrder[]>([]);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const res = await fetch('http://localhost:8000/clothing-order/all', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				if (res.ok) {
					const data = await res.json();
					setOrders(data);
				} else {
					console.error('Failed to fetch orders');
				}
			} catch (error) {
				console.error('Error fetching orders:', error);
			}
		}
		fetchOrders();
	}, []);

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

	const exportData = () => {
  if (!orders || orders.length === 0) {
    console.warn("No hay órdenes para exportar");
    return;
  }

  // Definir las columnas (puedes agregar o quitar según necesites)
  const headers = [
    "orderId",
    "firstName",
    "lastName",
    "email",
    "addressLine1",
    "addressLine2",
    "city",
    "state",
    "zip",
    "country",
    "createdAt",
    "updatedAt",
    "itemId",
    "productId",
    "productName",
    "price",
    "quantity",
    "itemCreatedAt",
    "itemUpdatedAt",
  ];

  // Construir las filas (una por cada item de la orden)
  const rows = orders.flatMap(order =>
    order.items.map(item => ({
      orderId: order.id,
      firstName: order.firstName,
      lastName: order.lastName,
      email: order.email,
      addressLine1: order.addressLine1,
      addressLine2: order.addressLine2,
      city: order.city,
      state: order.state,
      zip: order.zip,
      country: order.country,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      itemId: item.id,
      productId: item.productId,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
      itemCreatedAt: item.createdAt,
      itemUpdatedAt: item.updatedAt,
    }))
  );

  // Convertir a CSV
  const csvHeaders = headers.join(",") + "\n";
  const csvRows = rows
    .map(row =>
      headers.map(h => `"${String((row as any)[h] ?? "")}"`).join(",")
    )
    .join("\n");

  const csv = csvHeaders + csvRows;

  // Crear blob y forzar descarga
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "orders.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


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
          <Button variant="outline" size="sm"
						onClick={exportData}
					>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>OrderId</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Products</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
						{orders.map((order) => (
						<TableRow key={order.id}>
							<TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
							<TableCell>
								{order.firstName} {order.lastName}
								<div className="text-xs text-muted-foreground">{order.email}</div>
							</TableCell>
							<TableCell className="hidden md:table-cell">
								{order.items.length} {order.items.length === 1 ? "item" : "items"}
							</TableCell>
							<TableCell>${order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</TableCell>
							<TableCell>{renderStatus("processing")}</TableCell>
							<TableCell className="hidden sm:table-cell">{formatDate(order.createdAt)}</TableCell>
							{/* buttons */}
							<TableCell>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" className="h-8 w-8 p-0">
											<span className="sr-only">Open menu</span>
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Actions</DropdownMenuLabel>
										<DropdownMenuItem
											onClick={() => { alert(`Marking order ${order.id} as shipped`); }}
										>
											<PackageCheck className="mr-2 h-4 w-4" />
											Mark as Shipped
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => { alert(`Viewing details for order ${order.id}`); }}
										>	
											<XCircle className="mr-2 h-4 w-4" />
											Cancel Order
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<Download className="mr-2 h-4 w-4" />
											Download
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
						))}
					</TableBody>
        </Table>
      </div>
    </div>
  )
}
