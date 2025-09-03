import Link from 'next/link'
import React from 'react'
import AuthButtons from './AuthButtons'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CartItems from './CartItems'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold">MODISH</Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/collections/women" className="text-sm font-medium hover:text-gray-600">
                  WOMEN
                </Link>
              </li>
              <li>
                <Link href="/collections/men" className="text-sm font-medium hover:text-gray-600">
                  MEN
                </Link>
              </li>
              <li>
                <Link href="/collections/accessories" className="text-sm font-medium hover:text-gray-600">
                  ACCESSORIES
                </Link>
              </li>
              <li>
                <Link href="/collections/footwear" className="text-sm font-medium hover:text-gray-600">
                  FOOTWEAR
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <AuthButtons  />
            <Sheet>
              <SheetTrigger>
                Cart
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                  <SheetDescription>
                    Review your selected items before checkout.
                  </SheetDescription>
                </SheetHeader>
                <CartItems />
              </SheetContent>
            </Sheet>
            <Button variant="outline" size="icon" className="md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>
  )
}

export default Navbar