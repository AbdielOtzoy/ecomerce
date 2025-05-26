"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Trash2, Loader2, ImagePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { productFormSchema, ProductFormValues } from "@/lib/validation"

// Define the available categories - ajustadas para coincidir con tu backend
const categories = [
  { label: "Women's Clothing", value: "women" },
  { label: "Men's Clothing", value: "men" },
  { label: "Accessories", value: "accessories" },
  { label: "Footwear", value: "footwear" },
  { label: "Jewelry", value: "jewelry" },
  { label: "Bags", value: "bags" },
  { label: "Electronics", value: "electronics" },
  { label: "Home & Garden", value: "home" },
]

interface ProductImage {
  id: string
  url: string
  file: File // Ahora siempre tenemos el archivo
  isMain: boolean
}

export function ProductForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<ProductImage[]>([])

  // Initialize the form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "",
    },
  });

  // Handle form submission
  async function onSubmit(data: ProductFormValues) {
    setIsLoading(true)

    try {
      // Crear FormData para enviar datos multipart
      const formData = new FormData()
      
      // Mapear los campos del formulario a los nombres esperados por el backend
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('price', data.price.toString())
      formData.append('stock', data.quantity.toString()) // quantity -> stock
      
      // Enviar categorías como array (convertir valor único a array)
      const categoriesArray = [data.category]
      formData.append('categories', categoriesArray.join(','))
      
      // Agregar la imagen principal si existe
      const mainImage = images.find(img => img.isMain)
      if (mainImage?.file) {
        formData.append('image', mainImage.file)
      }

      // Llamar a la API del backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/products`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error creating product')
      }

      const createdProduct = await response.json()
      console.log("Product created:", createdProduct)

      // Si hay imágenes adicionales (no principales), subirlas una por una
      const additionalImages = images.filter(img => !img.isMain)
      for (const image of additionalImages) {
        if (image.file) {
          await uploadAdditionalImage(createdProduct.id, image.file)
        }
      }

      // Show success message
      toast.success(`${data.name} has been created successfully.`)

      // Redirect to products page
      router.push("/dashboard/products")
      
    } catch (error) {
      console.error("Error creating product:", error)
      toast.error(`${data.name} could not be created. ${(error as Error).message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Función para subir imágenes adicionales
  async function uploadAdditionalImage(productId: number, file: File) {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/products/${productId}/upload-image`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        console.error('Error uploading additional image')
      }
    } catch (error) {
      console.error('Error uploading additional image:', error)
    }
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Validar tamaño y tipo de archivos
    const validFiles: File[] = []
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

    Array.from(files).forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} is not a valid image format. Please use JPG, PNG, or WebP.`)
        return
      }
      
      if (file.size > maxSize) {
        toast.error(`${file.name} is too large. Maximum size is 5MB.`)
        return
      }
      
      validFiles.push(file)
    })

    // Procesar archivos válidos
    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          const newImage: ProductImage = {
            id: crypto.randomUUID(),
            url: event.target.result as string,
            file, // Guardar el archivo original
            isMain: images.length === 0, // La primera imagen es la principal
          }
          
          setImages((prev) => [...prev, newImage])
        }
      }
      reader.readAsDataURL(file)
    })

    // Limpiar el input
    e.target.value = ''
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                      <Input 
                        type="number" 
                        step="0.01" 
                        className="pl-6" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </div>
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
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Product Images</h3>
              {images.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {images.length} image{images.length !== 1 ? 's' : ''} selected
                  {images.find(img => img.isMain) && ' • Main image marked'}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {/* Image upload card */}
              <Card className="flex h-40 cursor-pointer flex-col items-center justify-center border-dashed hover:border-primary/50 transition-colors">
                <CardContent className="flex h-full w-full flex-col items-center justify-center p-6">
                  <label
                    htmlFor="image-upload"
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
                  >
                    <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Upload images</p>
                    <span className="mt-1 text-xs text-muted-foreground">PNG, JPG, WebP up to 5MB</span>
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
                <Card key={image.id} className="relative h-40 overflow-hidden group">
                  <img 
                    src={image.url} 
                    alt="Product preview"
                    className="h-full w-full object-cover" 
                  />
                  <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      type="button"
                      variant={image.isMain ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setMainImage(image.id)}
                      className="h-8 bg-white/90 text-xs hover:bg-white text-black"
                    >
                      {image.isMain ? "★ Main" : "Set Main"}
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
                  {image.isMain && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      Main
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push("/dashboard/products")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || images.length === 0}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Creating Product...' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
