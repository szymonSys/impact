export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function categoryToSlug(category: string): string {
  const normalized = category.toLowerCase().replace(/\s+/g, "-");
  return encodeURIComponent(normalized);
}

export function slugToCategory(slug: string): string {
  const decoded = decodeURIComponent(slug);
  return decoded.replace(/-/g, " ");
}

export function capitalize(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
