import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Instagram, Facebook, Twitter } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="text-2xl font-bold">MODISH</div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="#" className="text-sm font-medium hover:text-gray-600">
                  NEW ARRIVALS
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium hover:text-gray-600">
                  WOMEN
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium hover:text-gray-600">
                  MEN
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium hover:text-gray-600">
                  ACCESSORIES
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium hover:text-gray-600">
                  SALE
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-sm font-medium hover:text-gray-600">
              ACCOUNT
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-gray-600">
              CART (0)
            </Link>
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
              {["Women", "Men", "Accessories", "Footwear"].map((category) => (
                <div key={category} className="group relative h-80 overflow-hidden rounded-lg">
                  <Image
                    src={`/placeholder.svg?height=600&width=400&text=${category}`}
                    alt={`${category} category`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                    <h3 className="mb-2 text-2xl font-bold">{category.toUpperCase()}</h3>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      SHOP NOW
                    </Button>
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
              {[
                { name: "Oversized Cotton Shirt", price: "$49.99" },
                { name: "High-Waist Slim Jeans", price: "$59.99" },
                { name: "Relaxed Fit Blazer", price: "$89.99" },
                { name: "Knitted Sweater Vest", price: "$45.99" },
              ].map((product, index) => (
                <div key={index} className="group">
                  <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-lg bg-gray-200">
                    <Image
                      src={`/placeholder.svg?height=600&width=450&text=Product ${index + 1}`}
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
                  src="/placeholder.svg?height=1000&width=800&text=Our Story"
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

        {/* Newsletter Section */}
        <section className="bg-gray-900 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">JOIN OUR COMMUNITY</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
              Subscribe to our newsletter to receive updates on new collections, exclusive offers, and styling tips.
            </p>
            <form className="mx-auto flex max-w-md flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 text-white placeholder:text-gray-400"
                required
              />
              <Button className="bg-white text-black hover:bg-gray-100">SUBSCRIBE</Button>
            </form>
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
                  <Link href="#" className="hover:text-black">
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
