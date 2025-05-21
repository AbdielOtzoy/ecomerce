"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Trash2, Plus, Loader2, ImagePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { productFormSchema, ProductFormValues } from "@/lib/validation"

// Define the available categories
const categories = [
  { label: "Women's Clothing", value: "women" },
  { label: "Men's Clothing", value: "men" },
  { label: "Accessories", value: "accessories" },
  { label: "Footwear", value: "footwear" },
  { label: "Jewelry", value: "jewelry" },
  { label: "Bags", value: "bags" },
]

// Define the available sizes
const availableSizes = [
  { id: "xs", label: "XS" },
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
  { id: "xxl", label: "XXL" },
]

// Define the available colors
const availableColors = [
  { id: "black", label: "Black", value: "#000000" },
  { id: "white", label: "White", value: "#ffffff" },
  { id: "gray", label: "Gray", value: "#808080" },
  { id: "red", label: "Red", value: "#ff0000" },
  { id: "blue", label: "Blue", value: "#0000ff" },
  { id: "green", label: "Green", value: "#008000" },
  { id: "yellow", label: "Yellow", value: "#ffff00" },
  { id: "purple", label: "Purple", value: "#800080" },
  { id: "pink", label: "Pink", value: "#ffc0cb" },
  { id: "brown", label: "Brown", value: "#a52a2a" },
]

interface Variant {
  id: string
  size: string
  color: string
  price: number
  quantity: number
}

interface ProductImage {
  id: string
  url: string
  file?: File
  isMain: boolean
}

export function ProductForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [variants, setVariants] = useState<Variant[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [images, setImages] = useState<ProductImage[]>([])

  // Initialize the form
  const form = useForm<ProductFormValues>({
  resolver: zodResolver(productFormSchema),
  defaultValues: {
    name: "",
    description: "",
    price: 0,
    compareAtPrice: 0,
    cost: 0,
    sku: "",
    barcode: "",
    quantity: 0,
    category: "",
    brand: "",
    tags: "",
    weight: 0,
    isPublished: true,
    isFeatured: false,
    isOnSale: false,
  },
});

  // Handle form submission
  async function onSubmit(data: ProductFormValues) {
    setIsLoading(true)

    try {
      // Simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Combine form data with variants and images
      const productData = {
        ...data,
        variants,
        images: images.map((img) => ({
          id: img.id,
          url: img.url,
          isMain: img.isMain,
        })),
      }

      console.log("Product data to submit:", productData)

            // Show success message
      toast(`${data.name} has been created successfully.`)

      // Redirect to products page
      router.push("/dashboard/products")
    } catch (error) {
      console.error("Error creating product:", error)
      toast(`${data.name} could not be created. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newImages: ProductImage[] = []

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          const newImage: ProductImage = {
            id: crypto.randomUUID(),
            url: event.target.result as string,
            file,
            isMain: images.length === 0 && newImages.length === 0,
          }
          newImages.push(newImage)
          setImages((prev) => [...prev, ...newImages])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  // Set an image as the main image
  const setMainImage = (id: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isMain: img.id === id,
      })),
    )
  }

  // Remove an image
  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id)

      // If we removed the main image, set the first remaining image as main
      if (filtered.length > 0 && !filtered.some((img) => img.isMain)) {
        filtered[0].isMain = true
      }

      return filtered
    })
  }

  // Toggle size selection
  const toggleSize = (sizeId: string) => {
    setSelectedSizes((prev) => (prev.includes(sizeId) ? prev.filter((id) => id !== sizeId) : [...prev, sizeId]))
  }

  // Toggle color selection
  const toggleColor = (colorId: string) => {
    setSelectedColors((prev) => (prev.includes(colorId) ? prev.filter((id) => id !== colorId) : [...prev, colorId]))
  }

  // Generate variants based on selected sizes and colors
  const generateVariants = () => {
    if (selectedSizes.length === 0 || selectedColors.length === 0) {
      toast("Please select at least one size and one color to generate variants.")
      


      return
    }

    const newVariants: Variant[] = []
    const basePrice = form.getValues("price") || 0

    selectedSizes.forEach((sizeId) => {
      const size = availableSizes.find((s) => s.id === sizeId)

      selectedColors.forEach((colorId) => {
        const color = availableColors.find((c) => c.id === colorId)

        if (size && color) {
          newVariants.push({
            id: crypto.randomUUID(),
            size: size.label,
            color: color.label,
            price: basePrice,
            quantity: 0,
          })
        }
      })
    })

    setVariants(newVariants)
  }

  // Update variant price
  const updateVariantPrice = (id: string, price: number) => {
    setVariants((prev) => prev.map((variant) => (variant.id === id ? { ...variant, price } : variant)))
  }

  // Update variant quantity
  const updateVariantQuantity = (id: string, quantity: number) => {
    setVariants((prev) => prev.map((variant) => (variant.id === id ? { ...variant, quantity } : variant)))
  }

  // Remove a variant
  const removeVariant = (id: string) => {
    setVariants((prev) => prev.filter((variant) => variant.id !== id))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter product description" className="min-h-32" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                        <Input type="number" step="0.01" className="pl-6" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="compareAtPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compare-at Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                        <Input type="number" step="0.01" className="pl-6" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>Original price before discount</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost per item</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                        <Input type="number" step="0.01" className="pl-6" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>Helps calculate profit</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                    <FormControl>
                      <Input placeholder="SKU-123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Barcode (ISBN, UPC, GTIN, etc.)</FormLabel>
                    <FormControl>
                      <Input placeholder="123456789012" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          {/* Variants Tab */}
          <TabsContent value="variants" className="space-y-6 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Size Options</h3>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <Button
                    key={size.id}
                    type="button"
                    variant={selectedSizes.includes(size.id) ? "default" : "outline"}
                    onClick={() => toggleSize(size.id)}
                    className="h-9 px-3"
                  >
                    {size.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Color Options</h3>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => (
                  <Button
                    key={color.id}
                    type="button"
                    variant={selectedColors.includes(color.id) ? "default" : "outline"}
                    onClick={() => toggleColor(color.id)}
                    className="h-9"
                  >
                    <span className="mr-2 h-4 w-4 rounded-full border" style={{ backgroundColor: color.value }} />
                    {color.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={generateVariants} className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Generate Variants
              </Button>
            </div>

            {variants.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Product Variants</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-3">Variant</div>
                    <div className="col-span-3">Color</div>
                    <div className="col-span-2">Price</div>
                    <div className="col-span-2">Quantity</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {variants.map((variant) => (
                      <div key={variant.id} className="grid grid-cols-12 gap-2 p-3">
                        <div className="col-span-3 flex items-center">{variant.size}</div>
                        <div className="col-span-3 flex items-center">
                          <span
                            className="mr-2 h-4 w-4 rounded-full border"
                            style={{
                              backgroundColor: availableColors.find((c) => c.label === variant.color)?.value,
                            }}
                          />
                          {variant.color}
                        </div>
                        <div className="col-span-2">
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                            <Input
                              type="number"
                              step="0.01"
                              className="pl-6"
                              value={variant.price}
                              onChange={(e) => updateVariantPrice(variant.id, Number.parseFloat(e.target.value))}
                            />
                          </div>
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            value={variant.quantity}
                            onChange={(e) => updateVariantQuantity(variant.id, Number.parseInt(e.target.value))}
                          />
                        </div>
                        <div className="col-span-2 flex justify-end">
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeVariant(variant.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Remove variant</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-6 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Product Images</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {/* Image upload card */}
                <Card className="flex h-40 cursor-pointer flex-col items-center justify-center border-dashed">
                  <CardContent className="flex h-full w-full flex-col items-center justify-center p-6">
                    <label
                      htmlFor="image-upload"
                      className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
                    >
                      <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload images</p>
                      <span className="mt-1 text-xs text-muted-foreground">PNG, JPG up to 5MB</span>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </CardContent>
                </Card>

                {/* Display uploaded images */}
                {images.map((image) => (
                  <Card key={image.id} className="relative h-40 overflow-hidden">
                    <img src={image.url || "/placeholder.svg"} alt="Product" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity hover:opacity-100">
                      <Button
                        type="button"
                        variant={image.isMain ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => setMainImage(image.id)}
                        className="h-8 bg-white/80 text-xs hover:bg-white"
                      >
                        {image.isMain ? "Main Image" : "Set as Main"}
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeImage(image.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter brand name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="summer, casual, cotton (comma separated)" {...field} />
                    </FormControl>
                    <FormDescription>Separate tags with commas</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormDescription>Used for shipping calculations</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Product Status</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Published</FormLabel>
                        <FormDescription>This product will appear in your store</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured</FormLabel>
                        <FormDescription>This product will be highlighted on your homepage</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isOnSale"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>On Sale</FormLabel>
                        <FormDescription>This product will be marked as on sale</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/products")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Product
          </Button>
        </div>
      </form>
    </Form>
  )
}
