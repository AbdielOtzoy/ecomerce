import Collection from "@/components/collections/Collection";
import { Product } from "@/lib/validation";

interface RouteParams {
  params: {
    id: string;
  };
}

const getProductsByCollectionId = async (id: string):Promise<Product[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/products/categories/${id}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching products for collection ID ${id}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }

}

export default async function CollectionsPage({ params }: RouteParams) {
  const { id } = await params;

  console.log("Collection ID:", id);

  const products = await getProductsByCollectionId(id);
  console.log("Products for collection:", products);
  return (
    <Collection 
      products={products} 
      collectionId={id}
    />
  )
}
