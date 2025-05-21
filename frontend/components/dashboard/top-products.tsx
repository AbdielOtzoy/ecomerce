"use client"

import { Progress } from "@/components/ui/progress"

// Sample data
const products = [
  {
    name: "Oversized Cotton Shirt",
    category: "Women",
    sales: 342,
    revenue: 17100,
    growth: 12.5,
  },
  {
    name: "High-Waist Slim Jeans",
    category: "Women",
    sales: 276,
    revenue: 16560,
    growth: 8.3,
  },
  {
    name: "Relaxed Fit Blazer",
    category: "Men",
    sales: 243,
    revenue: 21870,
    growth: 15.7,
  },
  {
    name: "Knitted Sweater Vest",
    category: "Women",
    sales: 198,
    revenue: 9108,
    growth: -2.4,
  },
  {
    name: "Leather Crossbody Bag",
    category: "Accessories",
    sales: 187,
    revenue: 14960,
    growth: 5.9,
  },
]

export function TopProducts() {
  // Calculate max sales for progress bar
  const maxSales = Math.max(...products.map((product) => product.sales))

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.name} className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-xs text-muted-foreground">{product.category}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${(product.revenue / 100).toFixed(2)}</p>
              <p className={`text-xs ${product.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                {product.growth >= 0 ? "+" : ""}
                {product.growth}%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={(product.sales / maxSales) * 100} className="h-2" />
            <span className="text-xs text-muted-foreground w-10">{product.sales}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
