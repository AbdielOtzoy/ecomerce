"use client"

import { useCart } from '@/stores/cartStore'
import { CartItem } from '@/types';
import React, { useEffect, useState } from 'react'
import CartCard from './CartCard';
import Link from 'next/link';

const CartItems = () => {
    const { getCartItemsCount, getCart, cart, removeFromCart, getCartTotal } = useCart();
    const [products, setProducts] = useState<CartItem[]>([]);
    useEffect(() => {
      getCart();
      setProducts(  
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cart?.items ?? []).map((item: any) => ({
          createdAt: item.createdAt ?? "",
          id: item.id ?? "",
          price: item.price ?? "",
          productId: item.productId ?? "",
          productName: item.productName ?? "",
          quantity: item.quantity ?? 0,
          updatedAt: item.updatedAt ?? "",
          imageUrl: item.imageUrl ?? "",
        }))
      );
    }, [getCart]);

    const deleteItem = (id: string) => {
      removeFromCart(id);
      setProducts(products.filter(item => item.id !== id));
    };

    return (
      <div className='px-4 '>
          <ul>
            {products.map((item) => (
              <CartCard key={item.id} item={item} removeFromCart={deleteItem} />
            ))}
          </ul>
          { products.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>You have {getCartItemsCount()} items in your cart.</p>
              <p>Total: ${getCartTotal()}</p>
              <Link href="/checkout" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
    )
}

export default CartItems