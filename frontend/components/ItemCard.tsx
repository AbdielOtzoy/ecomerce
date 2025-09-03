import { Product } from '@/lib/validation'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

const ItemCard = ({product} : {product: Product}) => {
  return (
   <div  className="group">
        <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-lg bg-gray-200">
        <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-black/70 p-4 text-white transition-transform duration-300 group-hover:translate-y-0">
            <Button className="w-full">ADD TO CART</Button>
        </div>
        </div>
        <h3 className="mb-1 text-lg font-medium">{product.name}</h3>
        <p className="font-medium text-gray-900">{product.price}</p>
    </div>
  )
}

export default ItemCard