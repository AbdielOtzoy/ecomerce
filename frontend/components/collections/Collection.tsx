"use client"

import { useState } from "react"
import { CollectionsHeader } from "@/components/collections/collections-header"
import { ProductGrid } from "@/components/collections/product-grid"
import { ProductDetailModal } from "@/components/collections/product-detail-modal"
import { Product } from "@/lib/validation"

type CollectionParams = {
  products: Product[]
  collectionId: string
}

const Collection = ({ products, collectionId }: CollectionParams) => {


    const [selectedCategory, setSelectedCategory] = useState("all")
      const [sortBy, setSortBy] = useState("featured")
      const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)
    
      // Filter products based on selected category
      const filteredProducts =
        selectedCategory === "all" ? products : products.filter((product) => product.categories[0] === selectedCategory)

      // Sort products based on selected sort option
      const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "name":
            return a.name.localeCompare(b.name)
          case "rating":
            return b.rating - a.rating
          default:
            return 0
        }
      })
  return (
    <div className="min-h-screen bg-gray-50">
          <CollectionsHeader
            sortBy={sortBy}
            onSortChange={setSortBy}
            productCount={sortedProducts.length}
          />
    
          <main className="container mx-auto px-4 py-8">
            <ProductGrid products={sortedProducts} onProductClick={setSelectedProduct} />
          </main>
    
          {selectedProduct && (
            <ProductDetailModal
              product={selectedProduct}
              isOpen={!!selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </div>
  )
}

export default Collection