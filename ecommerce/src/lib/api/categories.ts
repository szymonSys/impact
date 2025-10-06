import { API_BASE_URL, DEFAULT_REVALIDATE } from "./config";

export async function getAllCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/products/categories`, {
    next: { revalidate: DEFAULT_REVALIDATE },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}
