import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(2, { message: "Product name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  compareAtPrice: z.coerce.number().nonnegative().optional(),
  cost: z.coerce.number().nonnegative().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  quantity: z.coerce.number().int().nonnegative({ message: "Quantity must be a positive number." }),
  category: z.string({ required_error: "Please select a category." }),
  brand: z.string().optional(),
  tags: z.string().optional(),
  weight: z.coerce.number().nonnegative().optional(),
  isPublished: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isOnSale: z.boolean().default(false),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
