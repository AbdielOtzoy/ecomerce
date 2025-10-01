export type CartItem = {
  createdAt: string;
  id: string;
  price: string;
  productId: string;
  productName: string;
  imageUrl: string;
  quantity: number;
  updatedAt: string;
};

export type ClothingOrder = {
  id: string;
  items: CartItem[];
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};