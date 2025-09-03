import { CartItem } from '@/types'
import Image from 'next/image'
import React from 'react'

const CartCard = ({ item, removeFromCart }: { item: CartItem, removeFromCart: (id: string) => void }) => {
    return (
        <div className="flex items-center gap-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm mb-4 max-w-md">
            <Image
                src={item.imageUrl}
                alt={item.productId}
                width={80}
                height={80}
                className="rounded-md object-cover"
            />
            <div className="flex-1">
                <h3 className="m-0 text-gray-800">{item.productName}</h3>
                <p className="m-0.5 text-gray-600">Price: <b>${item.price}</b></p>
                <p className="m-0 text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white border-none rounded px-4 py-2 cursor-pointer font-medium transition-colors"
            >
                Remove
            </button>
        </div>
    )
}

export default CartCard