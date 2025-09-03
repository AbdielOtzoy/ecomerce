"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Instagram, Facebook, Twitter } from "lucide-react"
import Navbar from "@/components/Navbar"
import { Product } from "@/lib/validation"
import { useEffect, useState } from "react"
import ItemCard from "@/components/ItemCard"

const getLatestProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`http://localhost:8000/products/latest/4`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (!response.ok) {
      throw new Error("Failed to fetch latest products");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching latest products:", error.message);
    throw error;
  }
}

export default function HomePage() {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    getLatestProducts()
      .then((data) => {
        setLatestProducts(data);
        console.log("Latest products fetched successfully:", data);
      })
      .catch((error) => {
        console.error("Error fetching latest products:", error);
      });
  }, []);
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] w-full">
          <div className="absolute inset-0">
            <Image
              src="/img/hero-image.jpg"
              alt="Fashion model wearing the latest collection"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
            <h1 className="mb-4 text-5xl font-bold md:text-7xl">COLLECTION 2025</h1>
            <p className="mb-8 max-w-2xl text-lg md:text-xl">
              Discover the latest trends and elevate your style with our exclusive collection.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                SHOP WOMEN
              </Button>
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                SHOP MEN
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">SHOP BY CATEGORY</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {["women", "men", "accessories", "footwear"].map((category) => (
                <div key={category} className="group relative h-80 overflow-hidden rounded-lg">
                  <Image
                    src={`/img/products/${category}-category.webp`}
                    alt={`${category} category`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                    <h3 className="mb-2 text-2xl font-bold">{category.toUpperCase()}</h3>
                    <Link href={`/collections/${category}`} className="text-sm font-medium hover:underline cursor-pointer">
                      <Button variant="outline" className="border-white hover:bg-white text-black">
                        SHOP NOW
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-3xl font-bold">NEW ARRIVALS</h2>
              <Link href="#" className="flex items-center text-sm font-medium hover:underline">
                VIEW ALL <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {latestProducts.map((product) => (
                <ItemCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="relative h-[500px] overflow-hidden rounded-lg">
                <Image
                  src="/img/store.webp"
                  alt="Our clothing store story"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="mb-6 text-3xl font-bold">OUR STORY</h2>
                <p className="mb-6 text-lg text-gray-600">
                  Founded in 2020, MODISH was born from a passion for sustainable fashion and timeless style. We believe
                  that clothing should be both beautiful and responsibly made.
                </p>
                <p className="mb-8 text-lg text-gray-600">
                  Our collections are thoughtfully designed using high-quality, eco-friendly materials that are meant to
                  last. We&apos;re committed to ethical manufacturing practices and creating pieces that you&apos;ll love for
                  years to come.
                </p>
                <Button>LEARN MORE ABOUT US</Button>
              </div>
            </div>
          </div>
        </section>


      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">MODISH</h3>
              <p className="mb-4 text-gray-600">Modern, sustainable fashion for the conscious consumer.</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-600 hover:text-black">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-black">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-black">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">SHOP</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="#" className="hover:text-black">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Women
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Men
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">HELP</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="#" className="hover:text-black">
                    Customer Service
                  </Link>
                </li>
                <li>
                  <Link href="" className="hover:text-black">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Find a Store
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Legal & Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">ABOUT</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="#" className="hover:text-black">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Wholesale
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} MODISH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
