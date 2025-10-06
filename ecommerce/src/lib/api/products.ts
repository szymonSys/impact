import type { Product } from "@/types";
import { API_BASE_URL, DEFAULT_REVALIDATE } from "./config";

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    next: { revalidate: DEFAULT_REVALIDATE },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    next: { revalidate: DEFAULT_REVALIDATE },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch product ${id}`);
  }

  return response.json();
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products/category/${category}`, {
    next: { revalidate: DEFAULT_REVALIDATE },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products for category ${category}`);
  }

  return response.json();
}
