"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { Product } from "@/lib/validation"

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {!product.stock && <Badge variant="destructive">Out of Stock</Badge>}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation()
              // Handle wishlist toggle
            }}
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>

          {/* Quick Add Button */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              className="w-full"
              size="sm"
              disabled={!product.stock}
              onClick={(e) => {
                e.stopPropagation()
                // Handle quick add to cart
              }}
            >
              {product.stock ? "Quick Add" : "Out of Stock"}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">${product.price}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
