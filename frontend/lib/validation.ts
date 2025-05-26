import { z } from "zod"

export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be less than 100 characters"),
  
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  
  price: z
    .number()
    .min(0.01, "Price must be greater than 0")
    .max(999999.99, "Price must be less than 1,000,000"),
  
  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .min(0, "Quantity cannot be negative")
    .max(999999, "Quantity must be less than 1,000,000"),
  
  category: z
    .string()
    .min(1, "Please select a category"),
})

export type ProductFormValues = z.infer<typeof productFormSchema>

// Tipo para el producto que se enviará al backend
export interface ProductCreatePayload {
  name: string
  description: string
  price: number
  stock: number // quantity se mapea a stock
  categories: string[] // category se convierte en array
  imageUrl?: string // Se llenará automáticamente por el backend
}